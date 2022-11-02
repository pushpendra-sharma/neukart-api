const WishListModel = require('../models/wishList');
const { validateProductId, validateUserId } = require('../utilities/validator');

const addToWishlist = async (req, res, next) => {
  const { userId, productId } = req.params;
  try {
    const validItem = await validateProductId(productId);
    const validUser = await validateUserId(userId);

    let errorMessage = '';
    if (validItem && validUser) {
      const [wishlist] = await WishListModel.find(
        { userId: userId },
        { _id: 0, __v: 0 }
      );
      const myWishlist = Object.assign(
        {},
        {
          userId: userId,
          items: [productId],
        }
      );

      if (wishlist) {
        if (wishlist.items.includes(productId)) {
          res.status(400).json({
            message: 'Item already in wishlist',
          });
        } else {
          const updatedWishlist = await WishListModel.findOneAndUpdate(
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
          res.status(201).json(updatedWishlist.items);
        }
      } else {
        const newWishlist = await WishListModel.create(myWishlist);
        res.status(201).json(newWishlist.items);
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

const removeFromWishlist = async (req, res, next) => {
  const { userId, productId } = req.params;

  try {
    const validItem = await validateProductId(productId);
    const validUser = await validateUserId(userId);

    let errorMessage = '';
    if (validItem && validUser) {
      const [myWishlist] = await WishListModel.find(
        { userId: userId },
        { _id: 0, __v: 0 }
      );

    const updatedWishlist=  await WishListModel.findOneAndUpdate(
        { userId: userId },
        {
          userId: userId,
          items: myWishlist.items.filter(item => item !== productId),
        },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(201).json(updatedWishlist.items);
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

const getWishlistItems = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const [wishlistItem] = await WishListModel.find(
      { userId: userId },
      { _id: 0, __v: 0 }
    );

    if (validateUserId(userId) && wishlistItem) {
      res.status(200);
      res.send(wishlistItem.items);
    } else if (!validateUserId(userId)) {
      res.status(400).json({ message: 'Invalid User' });
    } else {
      res.status(400).json({ message: 'Could not find any items in wishlist' });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
  next();
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getWishlistItems,
};
