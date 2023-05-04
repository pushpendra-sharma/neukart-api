import { Request, Response, NextFunction } from 'express';
import { ParsedQs } from 'qs';
import { findProductsBySearch } from '../services';

interface ISearchQuery extends ParsedQs {
  searchTerm: string;
}

export const getSearchResults = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { searchTerm } = req.query as ISearchQuery;
  const regex = new RegExp(searchTerm, 'i');

  try {
    const products = await findProductsBySearch({
      $or: [
        { category: { $regex: regex } },
        { category: { $regex: regex } },
        { productName: { $regex: regex } },
        { description: { $regex: regex } },
        { productName: { $regex: regex } },
      ],
    });

    const suggestions = products.map(item => ({
      id: item._id,
      name: item.productName,
    }));

    if (products.length) {
      res.status(201).json({
        success: true,
        message: 'Search results',
        query: searchTerm,
        suggestions,
      });
    } else {
      res.status(400).json({
        success: true,
        message: `No match found for ${searchTerm}`,
        query: searchTerm,
        suggestions,
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
