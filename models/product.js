const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true },
    productName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    company: { type: String, required: true },
    price: { type: Number },
    mrp: { type: Number },
    discount: { type: Number, default: 0 },
    offer: { type: String },
    features: { type: String },
    availability: { type: String },
    rating: { type: Number },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const ProductsModel = mongoose.model('product', productSchema);

module.exports = { ProductsModel, productSchema };
