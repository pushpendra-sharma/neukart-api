import { FilterQuery, QueryOptions } from 'mongoose';
import { IProduct, ProductDocument, ProductsModel } from '../models';

export async function createProduct(input: IProduct) {
  try {
    const result = await ProductsModel.create(input);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function findProduct(
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const result = await ProductsModel.findOne(query, {}, options);
    return result;
  } catch (e) {
    throw e;
  }
}

export async function findAllProducts() {
  try {
    const products = await ProductsModel.find({}).lean();
    return products;
  } catch (e) {
    throw e;
  }
}

export async function deleteProduct(query: FilterQuery<ProductDocument>) {
  return ProductsModel.deleteOne(query);
}

export async function validateProductId(id: string) {
  const product = await ProductsModel.findById(id).lean();
  if (product) return true;

  return false;
}
