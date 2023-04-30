import { Request, Response, NextFunction } from 'express';
import {
  createWishlist,
  findAndUpdateWishlist,
  findWishlist,
  validateProductId,
  validateUserId,
} from '../services';

export const addToWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId } = req.params;
  try {
    const validItem = await validateProductId(productId);
    const validUser = await validateUserId(userId);

    let errorMessage = '';
    if (validItem && validUser) {
      const existingWishlist = await findWishlist({ userId });

      if (existingWishlist) {
        const wishlistWithExistingItem = await findWishlist({
          userId: userId,
          items: { $in: [productId] },
        });

        if (wishlistWithExistingItem) {
          res.status(400).json({
            success: false,
            message: 'Item already in wishlist',
            items: existingWishlist.items,
          });
        } else {
          const updatedWishlist = await findAndUpdateWishlist(
            { userId: userId },
            {
              $push: {
                items: productId,
              },
            }
          );

          if (updatedWishlist)
            res.status(200).json({
              success: true,
              message: 'Item added to wishlist successfully!',
              items: updatedWishlist.items,
            });
        }
      } else {
        const wishlist = {
          userId: userId,
          items: [productId],
        };

        const newWishlist = await createWishlist(wishlist);

        res.status(200).json({
          success: true,
          message: 'Item added to wishlist successfully!',
          items: newWishlist.items,
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
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const removeFromWishlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, productId } = req.params;

  try {
    const validItem = await validateProductId(productId);
    const validUser = await validateUserId(userId);

    let errorMessage = '';
    if (validItem && validUser) {
      const updatedWishlist = await findAndUpdateWishlist(
        { userId: userId },
        {
          $pull: {
            items: productId,
          },
        }
      );

      if (updatedWishlist)
        res.status(200).json({
          success: true,
          message: 'Item removed from wishlist successfully!',
          items: updatedWishlist.items,
        });
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
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const getWishlistItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const wishlist = await findWishlist({ userId });

    if ((await validateUserId(userId)) && wishlist && wishlist.items) {
      res.status(200);
      res.send({ success: true, items: wishlist.items });
    } else if (!(await validateUserId(userId))) {
      res.status(400).json({ success: false, message: 'Invalid User' });
    } else {
      res.status(400).json({
        success: false,
        message: 'Could not find any items in wishlist',
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
};
