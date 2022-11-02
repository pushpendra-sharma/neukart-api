const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String },
    dateOfBirth: { type: Date },
    email: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    pincode: { type: Number },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

const UsersModel = mongoose.model('user', userSchema);
module.exports = UsersModel;
