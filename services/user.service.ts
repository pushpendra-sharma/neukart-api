import { FilterQuery } from 'mongoose';
import { IUser, UserDocument, UsersModel } from '../models';
import { validatePassword } from '../utils';

export async function findUser(query: FilterQuery<UserDocument>) {
  return UsersModel.findOne(query, {});
}

export async function createUser(input: IUser) {
  try {
    const user = await UsersModel.create(input);

    return user;
  } catch (e) {
    throw e;
  }
}

export async function validateUserPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  if (email) {
    const myUser = await findUser({ email });

    if (!myUser) {
      throw new Error(
        'Sorry, it looks like you are not registered with us. Please sign up.'
      );
    }

    if (validatePassword(password)) {
      const passwordIsCorrect = await myUser.comparePassword(password);
      if (!passwordIsCorrect) {
        throw new Error('Incorrect password. Please try again.');
      }

      return myUser;
    } else {
      throw new Error('Invalid password. Please try again.');
    }
  } else {
    throw new Error('Enter your email address.');
  }
}

export async function validateUserId(id: string) {
  const user = await UsersModel.findById(id).lean();
  if (user) return true;

  return false;
}

export async function validateExistingUserByEmail(email: string) {
  const user = await findUser({ email });
  if (user) return true;

  return false;
}
