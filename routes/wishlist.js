const express = require('express');
const wishlistRouter = express.Router();
const wishlistController = require('../controller/wishlistController');

wishlistRouter.post(
  '/add/:userId/:productId',
  wishlistController.addToWishlist
);
wishlistRouter.delete(
  '/remove/:userId/:productId',
  wishlistController.removeFromWishlist
);
wishlistRouter.get('/:userId', wishlistController.getWishlistItems);

module.exports = wishlistRouter;
