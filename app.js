const express = require('express');
const dotenv = require('dotenv');
const myReqLogger = require('./utilities/logger');
const errorLogger = require('./utilities/errorLogger');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const wishlistRouter = require('./routes/wishlist');

dotenv.config();

mongoose
  .connect(
    'mongodb+srv://neukart:neukart@cluster0.3atab.mongodb.net/?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to DB '))
  .catch(err => console.log('Cannot connect to DB ', err));

// mongoose.connect('mongodb://localhost:27017/NeukartTestDB');
const app = express();

app.use(express.json());
app.use(cors());
app.use(myReqLogger);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);

router.all('*', (err, req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'Invalid path',
  });
  next(err);
});

app.use(errorLogger);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;
