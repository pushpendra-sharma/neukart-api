import express, { Request, Response, NextFunction } from 'express';
import {
  createCart,
  createUser,
  createWishlist,
  validateExistingUserByEmail,
  validateUserPassword,
} from '../services';
import {
  signJwt,
  validateEmail,
  validatePassword,
  validatePhoneNo,
  validateUserName,
} from '../utils';

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, mobileNumber, email, name } = req.body;

    let erroMessage = '';
    if (
      validateUserName(name) &&
      validatePassword(password) &&
      validatePhoneNo(mobileNumber) &&
      validateEmail(email)
    ) {
      const isExistingUser = await validateExistingUserByEmail(email);

      if (!isExistingUser) {
        const newUser = await createUser(req.body);

        const emptyCartOrWishlist = {
          userId: newUser._id,
          items: [],
        };

        await Promise.all([
          createCart(emptyCartOrWishlist),
          createWishlist(emptyCartOrWishlist),
        ]);

        const token =
          'Bearer ' +
          signJwt(
            { id: newUser.id, username: newUser.name },
            process.env.MY_SECRET || ''
          );

        res.set('Authorization', token).status(201).json({
          success: true,
          message: 'Signup successfull.',
          user: newUser,
          token,
        });
      } else {
        erroMessage =
          'This user already exists. Please log in or use a different email address to create a new account.';
        res.status(400).json({ success: false, message: erroMessage });
      }
    } else {
      if (!validatePassword(password)) {
        erroMessage =
          'Password should have minimum 5 and maximum 10 characters';
      } else if (!validatePhoneNo(mobileNumber)) {
        erroMessage = 'Mobile Number should be a valid one';
      } else if (!validateEmail(email)) {
        erroMessage = 'Email should be a valid one';
      } else if (!validateUserName(name)) {
        erroMessage = 'Name should be a valid one';
      }

      res.status(400).json({ success: false, message: erroMessage });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    if (validatePassword(password) && validateEmail(email)) {
      const myUser = await validateUserPassword({ email, password });

      if (myUser) {
        const token =
          'Bearer ' +
          signJwt(
            { id: myUser.id, username: myUser.name },
            process.env.MY_SECRET || ''
          );

        res.set('Authorization', token).status(200).json({
          success: true,
          message: 'User logged in successfully.',
          user: myUser,
          token,
        });
      } else {
        res.status(400).json({
          success: false,
          message:
            'Incorrect email or password. Please check your credentials and try again.',
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message:
          'Invalid email or password. Please check your credentials and try again.',
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  }
};

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
