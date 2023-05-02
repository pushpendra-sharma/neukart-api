import express, { Response, Request, NextFunction } from 'express';
import { authVerify } from '../middlewares/authMiddleware';
import { userRouter } from './users';
import { productRouter } from './product';
import { cartRouter } from './cart';
import { wishlistRouter } from './wishlist';
import { searchRouter } from './search';

export const router = express.Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/search', searchRouter);
router.use('/cart', authVerify, cartRouter);
router.use('/wishlist', authVerify, wishlistRouter);

router.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(200);
  res.send({ success: true, title: 'NeuKart application' });
});
