const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: String },
    items: [],
  },
  {
    timestamps: true,
  }
);

const WishListModel = mongoose.model('wishlist', wishlistSchema);
module.exports = WishListModel;
