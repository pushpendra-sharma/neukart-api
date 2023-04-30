import { Request, Response, NextFunction } from 'express';
import { createProduct, findAllProducts, findProduct } from '../services';
import { validateProductDetails } from '../utils';

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await findAllProducts();

    if (products && products.length > 0) {
      res.status(200).json({ success: true, items: products });
    } else
      res
        .status(400)
        .json({ success: false, message: 'No products available.' });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const getProductDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  try {
    const product = await findProduct({ _id: productId });

    if (product) {
      res.status(200).json({
        status: true,
        product,
      });
    } else {
      res.status(400).json({
        status: false,
        message: 'No product',
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

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (await validateProductDetails(req.body)) {
      const item = Object.assign({}, req.body);
      const newItem = await createProduct({ ...item });

      res.status(201).json({
        success: true,
        message: 'Product added Successfully!',
        productId: newItem._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid Product details.',
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
