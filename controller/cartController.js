const CartModel = require('../models/cart');
const { validateProductId, validateUserId } = require('../utilities/validator');

const addItemsToCart = async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    const validItem = await validateProductId(productId);
    const validUser = await validateUserId(userId);

    let errorMessage = '';
    if (validItem && validUser) {
      const [cartObj] = await CartModel.find(
        { userId: userId },
        { _id: 0, __v: 0 }
      );

      const myCart = Object.assign(
        {},
        {
          userId: userId,
          items: [productId],
        }
      );

      if (cartObj) {
        if (cartObj.items.includes(productId)) {
          res.status(400).json({
            message: 'Item already in cart',
          });
        } else {
          const updateCart = await CartModel.findOneAndUpdate(
            { userId: userId },
            {
              userId: userId,
              $push: {
                items: productId,
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );
          // res.status(201).json({
          //   message: 'Item added to cart successfully!',
          // });

          res.status(200);
          res.send(updateCart.items);
        }
      } else {
        const newCart = await CartModel.create(myCart);
        // res.status(201).json({
        //   message: 'Item added to cart successfully!',
        // });

        res.status(200);
        res.send(newCart.items);
      }
    } else {
      if (!validItem) {
        errorMessage = 'Invalid Item';
      } else if (!validUser) {
        errorMessage = 'Invalid User';
      }

      res.status(400).json({
        message: errorMessage,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
  next();
};

const removeItemsFromCart = async (req, res, next) => {
  const { userId, productId } = req.params;

  try {
    const validItem = await validateProductId(productId);
    const validUser = await validateUserId(userId);

    let errorMessage = '';
    if (validItem && validUser) {
      const [myCart] = await CartModel.find(
        { userId: userId },
        { _id: 0, __v: 0 }
      );

      const updatedCart = await CartModel.findOneAndUpdate(
        { userId: userId },
        {
          userId: userId,
          items: myCart.items.filter(item => item !== productId),
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200);
      res.send(updatedCart.items);

      // res.status(201).json({
      //   message: 'Item removed from cart successfully!',
      // });
    } else {
      if (!validItem) {
        errorMessage = 'Invalid Item';
      } else if (!validUser) {
        errorMessage = 'Invalid User';
      }

      res.status(400).json({
        message: errorMessage,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
  next();
};

const getCartItemsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const [cartItem] = await CartModel.find(
      { userId: userId },
      { _id: 0, __v: 0 }
    );

    if (validateUserId(userId) && cartItem) {
      res.status(200);
      res.send(cartItem.items);
    } else if (!validateUserId(userId)) {
      res.status(400).json({ message: 'Invalid User' });
    } else
      res.status(400).json({ message: 'Could not find any items in cart' });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
  next();
};

module.exports = {
  addItemsToCart,
  removeItemsFromCart,
  getCartItemsByUserId,
};
