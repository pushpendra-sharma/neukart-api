import { Request, Response, NextFunction } from 'express';
import { ProductsModel } from '../models';
import { validateProducDetails } from '../utils';

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await ProductsModel.find({});

    if (products.length > 0) {
      res.status(200).json({ success: true, items: products });
    } else
      res
        .status(400)
        .json({ success: false, message: 'No products available.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
};

export const getProductDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { productId } = req.params;
  try {
    const product = await ProductsModel.findById(productId);

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
    res.status(400).json({
      status: false,
      message: err,
    });
  }
};

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (await validateProducDetails(req.body)) {
      const item = Object.assign({}, req.body);
      let newItem = await ProductsModel.create(item);

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
    res.status(400).json({
      success: false,
      message: err,
    });
  }
};
