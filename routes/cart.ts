import express from 'express';
import {
  addItemsToCart,
  getCartItemsByUserId,
  removeItemsFromCart,
} from '../controllers';

export const cartRouter = express.Router();

cartRouter.post('/add/:userId/:productId', addItemsToCart);
cartRouter.delete('/remove/:userId/:productId', removeItemsFromCart);
cartRouter.get('/:userId', getCartItemsByUserId);
