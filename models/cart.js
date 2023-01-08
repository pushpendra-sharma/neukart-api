const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    items: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model('cart', cartSchema);

module.exports = CartModel;
