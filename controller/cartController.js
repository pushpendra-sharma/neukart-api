const CartModel = require('../models/cart');
const { validateProductId, validateUserId } = require('../utilities/validator');

const addItemsToCart = async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    const validItem = await validateProductId(productId);
    const validUser = await validateUserId(userId);

    let errorMessage = '';
    if (validItem && validUser) {
      const cartObj = await CartModel.findOne({ userId: userId });

      if (cartObj) {
        if (cartObj.items.includes(productId)) {
          res.status(400).json({
            success: false,
            message: 'Item already in cart',
            items: cartObj.items,
          });
        } else {
          const updateCart = await CartModel.findOneAndUpdate(
            { userId: userId },
            {
              $push: {
                items: productId,
              },
            },
            {
              new: true,
              runValidators: true,
            }
          );

          res.status(200).json({
            success: true,
            message: 'Item added to cart successfully!',
            items: updateCart.items,
          });
        }
      } else {
        const myCart = {
          userId: userId,
          items: [productId],
        };

        const newCart = await CartModel.create(myCart);

        res.status(200).json({
          message: 'Item added to cart successfully!',
          success: true,
          items: newCart.items,
        });
      }
    } else {
      if (!validItem) {
        errorMessage = 'Invalid Item';
      } else if (!validUser) {
        errorMessage = 'Invalid User';
      }

      res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  // next();
};

const removeItemsFromCart = async (req, res, next) => {
  const { userId, productId } = req.params;

  try {
    const validItem = await validateProductId(productId);
    const validUser = await validateUserId(userId);

    let errorMessage = '';
    if (validItem && validUser) {
      const updatedCart = await CartModel.findOneAndUpdate(
        { userId },
        {
          $pull: {
            items: productId,
          },
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        success: true,
        message: 'Item removed from cart successfully!',
        items: updatedCart.items,
      });
    } else {
      if (!validItem) {
        errorMessage = 'Invalid Item';
      } else if (!validUser) {
        errorMessage = 'Invalid User';
      }

      res.status(400).json({
        message: errorMessage,
        success: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  // next();
};

const getCartItemsByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId: userId });

    if (validateUserId(userId) && cart && cart.items) {
      res.status(200);
      res.send({ success: true, items: cart.items });
    } else if (!validateUserId(userId)) {
      res.status(400).json({ success: false, message: 'Invalid User!' });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Could not find any items in cart' });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  // next();
};

module.exports = {
  addItemsToCart,
  removeItemsFromCart,
  getCartItemsByUserId,
};
