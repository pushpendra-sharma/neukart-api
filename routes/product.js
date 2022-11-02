const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController');

productRouter.post('/addProduct', productController.addProduct);
productRouter.get('/', productController.getAllProducts);
productRouter.get('/:productId', productController.getProductDetails);

module.exports = productRouter;
