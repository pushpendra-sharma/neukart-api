const express = require('express');
const { authVerify } = require('../middlewares/authMiddleware');
const userRoutes = require('./users');
const cartRoutes = require('./cart');
const productRoutes = require('./product');
const wishlistRoutes = require('./wishlist');

const indexRouter = express.Router();

indexRouter.use('/users', userRoutes);
indexRouter.use('/products', productRoutes);
indexRouter.use(authVerify);
indexRouter.use('/cart', cartRoutes);
indexRouter.use('/wishlist', wishlistRoutes);
indexRouter.all('*', (req, res, next) => {});

/* GET home page. */
indexRouter.get('/', (req, res, next) => {
  res.status(200);
  res.send({ success: true, title: 'NeuKart application' });
  // next();
});

module.exports = indexRouter;
