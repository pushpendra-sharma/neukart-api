const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: { type: String },
    items: [],
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model('cart', cartSchema);

module.exports = CartModel;
