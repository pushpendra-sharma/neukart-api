const { ProductsModel } = require('../models/product');
const UsersModel = require('../models/user');

exports.validateUserName = name => {
  if (name.trim().length >= 3 && name.trim().length <= 50) {
    return true;
  }
  return false;
};

exports.validateUserPassword = pwd => {
  if (pwd.length >= 5 && pwd.length <= 10) {
    return true;
  }
  return false;
};

exports.validateUserAge = dateOfBirth => {
  const calculateAge = dob => {
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
      console.log(err);
      return 0;
    }
  };

  const age = calculateAge(dateOfBirth);

  if (age > 20 && age < 100) {
    return true;
  }
  return false;
};

exports.validateGender = gender => {
  if (gender === 'M' || gender === 'F') {
    return true;
  }
  return false;
};

exports.validatePhoneNo = mobile => {
  if (mobile.toString().length === 10) {
    return true;
  }
  return false;
};

exports.validateEmail = email => {
  if (email.includes('@')) {
    return true;
  }
  return false;
};

exports.validatePincode = pin => {
  if (typeof pin == 'number' && pin.toString().length === 6) {
    return true;
  }
  return false;
};

exports.validateCity = city => {
  if (city.length >= 3 && city.length <= 20) {
    return true;
  }
  return false;
};

exports.validateState = state => {
  if (state.length >= 3 && state.length <= 20) {
    return true;
  }
  return false;
};

exports.validateCountry = country => {
  if (country.length >= 3 && country.length <= 20) {
    return true;
  }
  return false;
};

exports.validateExistingUserByEmail = async id => {
  const users = await UsersModel.find({ email: id }, { _id: 0, __v: 0 });
  if (users.length > 0) {
    return true;
  }
  return false;
};

exports.validateProductId = async id => {
  const products = await ProductsModel.find(
    { productId: id },
    { _id: 0, __v: 0 }
  );
  if (products.length > 0) {
    return true;
  }
  return false;
};

exports.validateUserId = async id => {
  const users = await UsersModel.find({ userId: id }, { _id: 0, __v: 0 });
  if (users.length > 0) {
    return true;
  }
  return false;
};

exports.validateProducDetails = async details => {
  const { productName, description, category, company, price } = details;
  if (productName && description && category && company && price) {
    return true;
  }
  return false;
};
