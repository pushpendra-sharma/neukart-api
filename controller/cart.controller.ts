import { Request, Response, NextFunction } from 'express';
import {
  createCart,
  findAndUpdateCart,
  findCart,
  validateProductId,
  validateUserId,
} from '../services';

export const addItemsToCart = async (
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
      const existingCart = await findCart({ userId });

      if (existingCart) {
        const cartWithExistingItem = await findCart({
          userId: userId,
          items: { $in: [productId] },
        });

        if (cartWithExistingItem) {
          res.status(400).json({
            success: false,
            message: 'Item already in cart',
            items: existingCart.items,
          });
        } else {
          const updatedCart = await findAndUpdateCart(
            { userId: userId },
            {
              $push: {
                items: productId,
              },
            }
          );

          if (updatedCart)
            res.status(200).json({
              success: true,
              message: 'Item added to cart successfully!',
              items: updatedCart.items,
            });
        }
      } else {
        const cart = {
          userId: userId,
          items: [productId],
        };

        const newCart = await createCart(cart);

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
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const removeItemsFromCart = async (
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
      const updatedCart = await findAndUpdateCart(
        { userId },
        {
          $pull: {
            items: productId,
          },
        }
      );

      if (updatedCart)
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
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const getCartItemsByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  try {
    const isValidUser = await validateUserId(userId);

    if (isValidUser) {
      const cart = await findCart({ userId: userId });

      if (cart && cart.items) {
        res.status(200);
        res.send({ success: true, items: cart.items });
      } else {
        res.status(400).json({
          success: false,
          message: 'Could not find any items in cart',
        });
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid User!' });
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
