import express, { Express, Response, Request, Application } from 'express';
import { addToWishlist, getWishlistItems, removeFromWishlist } from '../controller';

export const wishlistRouter = express.Router();

wishlistRouter.post('/add/:userId/:productId', addToWishlist);
wishlistRouter.delete('/remove/:userId/:productId', removeFromWishlist);
wishlistRouter.get('/:userId', getWishlistItems);
