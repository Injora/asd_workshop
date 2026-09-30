const express = require('express');
const { cacheMiddleware } = require('../middleware/cacheMiddleware');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', cacheMiddleware, productController.getProducts);
router.get('/:id', cacheMiddleware, productController.getProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
