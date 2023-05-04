import express from 'express';
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from '../controllers';

export const wishlistRouter = express.Router();

wishlistRouter.post('/add/:userId/:productId', addToWishlist);
wishlistRouter.delete('/remove/:userId/:productId', removeFromWishlist);
wishlistRouter.get('/:userId', getWishlistItems);
