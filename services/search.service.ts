import { FilterQuery, QueryOptions } from 'mongoose';
import { ProductDocument, ProductsModel } from '../models';

export async function findProductsBySearch(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const cartObj = await ProductsModel.find(query, {}, options);
    return cartObj;
  } catch (e) {
    throw e;
  }
}
