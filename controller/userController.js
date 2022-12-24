const UsersModel = require('../models/user');
const CartModel = require('../models/cart');
const WishListModel = require('../models/wishList');
const { createAuthToken } = require('../middlewares/authMiddleware');

const {
  validateExistingUserByEmail,
  validateUserPassword,
  validatePhoneNo,
  validateEmail,
  validateUserName,
} = require('../utilities/validator');

const signup = async (req, res, next) => {
  try {
    const { password, mobileNumber, email, name } = req.body;

    const isExistingUser = await validateExistingUserByEmail(email);
    let erroMessage = '';
    if (
      validateUserName(name) &&
      validateUserPassword(password) &&
      validatePhoneNo(mobileNumber) &&
      validateEmail(email) &&
      !isExistingUser
    ) {
      const myUser = Object.assign({}, req.body);
      const newUser = await UsersModel.create(myUser);

      await CartModel.create({
        userId: newUser._id,
        items: [],
      });

      await WishListModel.create({
        userId: newUser._id,
        items: [],
      });

      const token = 'Bearer ' + createAuthToken(newUser._doc);

      res.set('Authorization', token).status(201).json({
        success: true,
        message: 'Signup successfull.',
        user: newUser,
        token,
      });
    } else {
      if (!validateUserPassword(password)) {
        erroMessage =
          'Password should have minimum 5 and maximum 10 characters';
      } else if (!validatePhoneNo(mobileNumber)) {
        erroMessage = 'Mobile Number should be a valid one';
      } else if (!validateEmail(email)) {
        erroMessage = 'Email should be a valid one';
      } else if (!validateUserName(name)) {
        erroMessage = 'Name should be a valid one';
      } else if (isExistingUser) {
        erroMessage = 'User exists with this email id';
      }

      res.status(400).json({ success: false, message: erroMessage });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
  // next();
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const myUser = await UsersModel.findOne({ email: email });

    if (!myUser) {
      throw new Error('Enter valid email.');
    }

    const passwordIsCorrect = await myUser.comparePassword(password);
    if (!passwordIsCorrect) {
      throw new Error('Incorrect password.');
    }
    if (myUser && passwordIsCorrect) {
      const token = 'Bearer ' + createAuthToken(myUser._doc);

      res.set('Authorization', token).status(200).json({
        success: true,
        message: 'User logged in successfully.',
        user: myUser,
        token,
      });
    } else {
      res.status(400).json({
        message: 'Incorrect user email or password',
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
  // next();
};

const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = { signup, login, logout };
