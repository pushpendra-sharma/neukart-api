const express = require('express');
const {
  addProduct,
  getAllProducts,
  getProductDetails,
} = require('../controller/productController');
const productRouter = express.Router();

productRouter.post('/addProduct', addProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:productId', getProductDetails);

module.exports = productRouter;
