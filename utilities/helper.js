const UsersModel = require('../models/user');
const { ProductsModel } = require('../models/product');

exports.generateUserId = async () => {
  const users = await UsersModel.find({}, { _id: 0, __v: 0 });

  if (users.length < 9) {
    return 'U-00' + (users.length + 1);
  }
  return 'U-0' + (users.length + 1);
};

exports.generateProductId = async () => {
  const products = await ProductsModel.find({}, { _id: 0, __v: 0 });

  if (products.length < 9) {
    return 'P-00' + (products.length + 1);
  }
  return 'P-0' + (products.length + 1);
};
