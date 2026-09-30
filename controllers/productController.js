const productService = require('../services/productService');
const { clearCache } = require('../middleware/cacheMiddleware');

async function getProducts(req, res) {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: 'aiyooo' });
  }
}

async function getProduct(req, res) {
  try {
    const productId = Number(req.params.id);
    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: 'aiyooo' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('aiyoo:', err);
    res.status(500).json({ error: 'aiyooo' });
  }
}

async function createProduct(req, res) {
  try {
    const newProduct = await productService.createProduct(req.body);
    clearCache();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'aiyooo' });
  }
}

async function updateProduct(req, res) {
  try {
    const productId = Number(req.params.id);
    const product = await productService.updateProduct(productId, req.body);

    if (!product) {
      return res.status(404).json({ error: 'aiyooo' });
    }

    clearCache();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: 'aiyooo' });
  }
}

async function deleteProduct(req, res) {
  try {
    const productId = Number(req.params.id);
    const deleted = await productService.deleteProduct(productId);

    if (!deleted) {
      return res.status(404).json({ error: 'aiyooo' });
    }

    clearCache();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'aiyooo' });
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
