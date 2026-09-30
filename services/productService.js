const { readProducts, writeProducts } = require('../database/productDatabase');

async function getAllProducts() {
  return readProducts();
}

async function getProductById(id) {
  const products = await readProducts();
  return products.find((item) => item.id === id);
}

async function createProduct(newProduct) {
  const products = await readProducts();
  products.push(newProduct);
  await writeProducts(products);
  return newProduct;
}

async function updateProduct(id, updatedFields) {
  const products = await readProducts();
  const productIndex = products.findIndex((item) => item.id === id);

  if (productIndex === -1) {
    return undefined;
  }

  products[productIndex] = { ...products[productIndex], ...updatedFields };
  await writeProducts(products);
  return products[productIndex];
}

async function deleteProduct(id) {
  const products = await readProducts();
  const productIndex = products.findIndex((item) => item.id === id);

  if (productIndex === -1) {
    return false;
  }

  products.splice(productIndex, 1);
  await writeProducts(products);
  return true;
}

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
