const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
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
    rating: { type: Number },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const ProductsModel = mongoose.model('product', productSchema);

module.exports = { ProductsModel, productSchema };
