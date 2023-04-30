import mongoose, { Document, Schema } from 'mongoose';

// Define interface for Mongoose document
export interface IProduct {
  productId: string;
  productName: string;
  description: string;
  category: string;
  company: string;
  price?: number;
  mrp: number;
  discount?: number;
  offer?: string;
  features?: string;
  availability: boolean;
  rating?: number;
  imageUrl: string;
}

export interface ProductDocument extends IProduct, Document {
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    productId: { type: String, unique: true },
    productName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: [true, 'Please enter category.'] },
    company: { type: String, required: [true, 'Please enter company'] },
    price: { type: Number },
    mrp: { type: Number, required: [true, 'Please enter MRP'] },
    discount: { type: Number, default: 0 },
    offer: { type: String },
    features: { type: String },
    availability: { type: Boolean },
    rating: { type: Number, default: 0 },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

export const ProductsModel = mongoose.model<ProductDocument>(
  'product',
  productSchema
);
