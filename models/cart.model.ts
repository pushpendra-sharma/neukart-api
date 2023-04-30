import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './user.model';
import { ProductDocument } from './product.model';

export interface ICart {
  userId: UserDocument['_id'];
  items: Array<ProductDocument['_id']>;
}

export interface CartDocument extends ICart, Document {
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    items: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  },
  {
    timestamps: true,
  }
);

export const CartModel = mongoose.model<CartDocument>('cart', cartSchema);
