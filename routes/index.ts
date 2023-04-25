import express, { Response, Request, NextFunction } from 'express';
import { userRouter } from './users';
import { productRouter } from './product';
import { authVerify } from '../middlewares/authMiddleware';
import { cartRouter } from './cart';
import { wishlistRouter } from './wishlist';

export const router = express.Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use(authVerify);
router.use('/cart', cartRouter);
router.use('/wishlist', wishlistRouter);

router.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(200);
  res.send({ success: true, title: 'NeuKart application' });
});
