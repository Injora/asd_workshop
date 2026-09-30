const fs = require('fs/promises');
const path = require('path');

const p = path.join(__dirname, '..', 'db.json');

async function readProducts() {
  const data = await fs.readFile(p, 'utf-8');
  return JSON.parse(data);
}

async function writeProducts(products) {
  await fs.writeFile(p, JSON.stringify(products, null, 2));
}

module.exports = { readProducts, writeProducts };
