import mongoose, { Document, Schema } from 'mongoose';

export interface ICart extends Document {
  userId: string;
  items: string[];
}

export interface CartDocument extends ICart {
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
