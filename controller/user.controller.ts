import { Request, Response, NextFunction } from 'express';
import {
  signJwt,
  validateEmail,
  validateExistingUserByEmail,
  validatePhoneNo,
  validateUserName,
  validateUserPassword,
} from '../utils';
import { CartModel, UsersModel, WishListModel } from '../models';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

      const token =
        'Bearer ' +
        signJwt(
          { id: newUser.id, username: newUser.name },
          process.env.MY_SECRET || '',
          '1d'
        );

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
      message: err,
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      const token =
        'Bearer ' +
        signJwt(
          { id: myUser.id, username: myUser.name },
          process.env.MY_SECRET || '',
          '1d'
        );

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
    res.status(400).json({ success: false, message: err });
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
