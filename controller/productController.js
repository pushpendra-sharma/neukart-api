const { ProductsModel } = require('../models/product');
const { validateProducDetails } = require('../utilities/validator');
const { generateProductId } = require('../utilities/helper');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductsModel.find({});

    if (products.length > 0) {
      res.status(200).json({ success: true, items: products });
    } else
      res
        .status(400)
        .json({ success: false, message: 'No products available.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err });
  }
  // next();
};

const getProductDetails = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await ProductsModel.findById(productId);

    if (product) {
      res.status(200).json({
        status: true,
        product,
      });
    } else {
      res.status(400).json({
        status: false,
        message: 'No product',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: false,
      message: err,
    });
  }
  // next();
};

const addProduct = async (req, res, next) => {
  try {
    if (validateProducDetails(req.body)) {
      const item = Object.assign({}, req.body);
      let newItem = await ProductsModel.create(item);

      res.status(201).json({
        success: true,
        message: 'Product added Successfully!',
        productId: newItem._id,
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid Product details.',
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err,
    });
  }
  // next();
};

module.exports = {
  getProductDetails,
  getAllProducts,
  addProduct,
};
