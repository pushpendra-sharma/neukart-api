import { FilterQuery, QueryOptions, UpdateQuery } from 'mongoose';
import { IWishlist, WishListModel, WishlistDocument } from '../models';

export async function createWishlist(input: IWishlist) {
  try {
    const newWishlist = await WishListModel.create(input);
    return newWishlist;
  }  catch (e) {
    throw e;
  }
}

export async function findWishlist(
  query: FilterQuery<WishlistDocument>,
  options: QueryOptions = { lean: true }
) {
  try {
    const wishlist = await WishListModel.findOne(query, {}, options);
    return wishlist;
  }  catch (e) {
    throw e;
  }
}

export async function findAndUpdateWishlist(
  query: FilterQuery<WishlistDocument>,
  update: UpdateQuery<WishlistDocument>,
  options: QueryOptions = {
    new: true,
    runValidators: true,
    lean: true,
  }
) {
  return WishListModel.findOneAndUpdate(query, update, options);
}

export async function deleteWishlist(query: FilterQuery<WishlistDocument>) {
  return WishListModel.deleteOne(query);
}
