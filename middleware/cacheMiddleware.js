const TTL = 60 * 1000;

let cache = {};

function cacheMiddleware(req, res, next) {
  const key = req.params.id || 'products';
  const entry = cache[key];

  if (entry && Date.now() - entry.createdAt < TTL) {
    res.set('X-Cache', 'HIT');
    return res.status(200).json(entry.data);
  }

  res.set('X-Cache', 'MISS');

  const originalJson = res.json.bind(res);
  res.json = (data) => {
    if (res.statusCode === 200) {
      cache[key] = { data, createdAt: Date.now() };
    }
    return originalJson(data);
  };

  next();
}

function clearCache() {
  cache = {};
}

module.exports = { cacheMiddleware, clearCache };
