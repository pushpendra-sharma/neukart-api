import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './user.model';
import { ProductDocument } from './product.model';

export interface IWishlist {
  userId: UserDocument['_id'];
  items: Array<ProductDocument['_id']>;
}

export interface WishlistDocument extends IWishlist, Document {
  createdAt: Date;
  updatedAt: Date;
}

const wishlistSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    items: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  },
  {
    timestamps: true,
  }
);

export const WishListModel = mongoose.model<WishlistDocument>(
  'wishlist',
  wishlistSchema
);
