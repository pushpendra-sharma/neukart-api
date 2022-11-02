const express = require('express');
const cartRouter = express.Router();
const cartController = require('../controller/cartController');

cartRouter.post('/add/:userId/:productId', cartController.addItemsToCart);
cartRouter.delete(
  '/remove/:userId/:productId',
  cartController.removeItemsFromCart
);
cartRouter.get('/:userId', cartController.getCartItemsByUserId);

module.exports = cartRouter;
