import { IProduct } from '../models';
import { logger } from './logger';

export const validateUserName = (name: string) => {
  if (name.trim().length >= 3 && name.trim().length <= 50) {
    return true;
  }
  return false;
};

export const validatePassword = (pwd: string) => {
  if (pwd.length >= 5 && pwd.length <= 10) {
    return true;
  }
  return false;
};

export const calculateAge = (dob: Date) => {
  try {
    const todayDate = new Date();
    const birthDate = new Date(dob);

    let age = todayDate.getFullYear() - birthDate.getFullYear();
    const month = todayDate.getMonth() - birthDate.getMonth();

    if (
      month < 0 ||
      (month == 0 && todayDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.message);
    }
    return 0;
  }
};

export const validateUserAge = (dateOfBirth: Date) => {
  const age = calculateAge(dateOfBirth);

  if (age > 20 && age < 100) {
    return true;
  }
  return false;
};

export const validateGender = (gender: string) => {
  if (gender === 'M' || gender === 'F') {
    return true;
  }
  return false;
};

export const validatePhoneNo = (mobile: number) => {
  if (mobile.toString().length === 10) {
    return true;
  }
  return false;
};

export const validateEmail = (email: string) => {
  if (email.includes('@')) {
    return true;
  }
  return false;
};

export const validatePincode = (pin: number) => {
  if (typeof pin == 'number' && pin.toString().length === 6) {
    return true;
  }
  return false;
};

export const validateCity = (city: string) => {
  if (city.length >= 3 && city.length <= 20) {
    return true;
  }
  return false;
};

export const validateState = (state: string) => {
  if (state.length >= 3 && state.length <= 20) {
    return true;
  }
  return false;
};

export const validateCountry = (country: string) => {
  if (country.length >= 3 && country.length <= 20) {
    return true;
  }
  return false;
};

export const validateProductDetails = async (details: IProduct) => {
  const { productName, description, category, company, mrp } = details;
  if (productName && description && category && company && mrp) {
    return true;
  }
  return false;
};
