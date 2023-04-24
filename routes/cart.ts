import express, { Express, Response, Request, Application } from 'express';
import {
  addItemsToCart,
  getCartItemsByUserId,
  removeItemsFromCart,
} from '../controller';

export const cartRouter = express.Router();

cartRouter.post('/add/:userId/:productId', addItemsToCart);
cartRouter.delete('/remove/:userId/:productId', removeItemsFromCart);
cartRouter.get('/:userId', getCartItemsByUserId);
