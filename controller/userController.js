const UsersModel = require('../models/user');

const {
  validateExistingUserByEmail,
  validateUserPassword,
  validatePhoneNo,
  validateEmail,
  validateUserName,
} = require('../utilities/validator');
const { generateUserId } = require('../utilities/helper');
const CartModel = require('../models/cart');
const WishListModel = require('../models/wishList');

const registerUser = async (req, res, next) => {
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
      const id = await generateUserId();
      const myUser = Object.assign({}, { userId: id }, req.body);
      let newUser = await UsersModel.create(myUser);

      await CartModel.create({
        userId: id,
        items: [],
      });

      await WishListModel.create({
        userId: id,
        items: [],
      });
      
      res.status(201).json(newUser);
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

      res.status(400).json({
        message: erroMessage,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
  next();
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await validateExistingUserByEmail(email);
    const userByEmailAndPassword = await UsersModel.find(
      { email: email, password: password },
      { _id: 0, __v: 0 }
    );

    const [myUser] = userByEmailAndPassword;
    if (user && userByEmailAndPassword.length > 0) {
      res.status(200);
      res.send(myUser);
    } else {
      res.status(400).json({
        message: 'Incorrect user email or password',
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
  next();
};

module.exports = { registerUser, loginUser };
