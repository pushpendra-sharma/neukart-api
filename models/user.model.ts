import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Define interface for Mongoose document
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  gender: string
  dateOfBirth: Date;
  mobileNumber: string;
  address: string;
}

export interface UserDocument extends IUser {
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;
}

// Define Mongoose schema for user
const userSchema: Schema = new Schema(
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
      validate: [validator.isEmail, 'Please enter a valid email'],
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

// Hashing password on save
userSchema.pre('save', async function (next) {
  let user = this;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (userPassword: string) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// Define Mongoose model for user
export const UsersModel = mongoose.model<UserDocument>('user', userSchema);
