import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { CartDocument, CartModel, ICart } from '../models';

export async function createCart(input: ICart) {
  try {
    const newCart = await CartModel.create(input);
    return newCart;
  } catch (e) {
    throw e;
  }
}

export async function findCart(
  query: FilterQuery<CartDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const cartObj = await CartModel.findOne(query, {}, options);
    return cartObj;
  } catch (e) {
    throw e;
  }
}

export async function findAndUpdateCart(
  query: FilterQuery<CartDocument>,
  update: UpdateQuery<CartDocument>,
  options: QueryOptions = {
    new: true,
    runValidators: true,
    lean: true,
  }
) {
  const updatedCart = await CartModel.findOneAndUpdate(query, update, options);
  return updatedCart;
}

export async function deleteCart(query: FilterQuery<CartDocument>) {
  return CartModel.deleteOne(query);
}
