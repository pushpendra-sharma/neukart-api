import mongoose, { Document, Schema } from 'mongoose';

export interface IWishlist extends Document {
  userId: string;
  items: string[];
}

export interface WishlistDocument extends IWishlist{
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
