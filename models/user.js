const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please enter your name'] },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    },
    gender: { type: String },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email'],
    },
    mobileNumber: {
      type: String,
      required: [true, 'Please enter phone number'],
    },
    address: { type: String },
  },
  {
    timestamps: true,
  }
);

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

const UsersModel = mongoose.model('user', userSchema);
module.exports = UsersModel;
