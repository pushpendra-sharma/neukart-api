const { ProductsModel } = require('../models/product');
const { validateProducDetails } = require('../utilities/validator');
const { generateProductId } = require('../utilities/helper');

const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductsModel.find({}, { _id: 0, __v: 0 });
    if (products.length > 0) {
      res.status(200);
      res.send(products);
    } else res.status(400).json({ message: 'No products available.' });
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
  next();
};

const getProductDetails = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const products = await ProductsModel.find(
      { productId: productId },
      { _id: 0, __v: 0 }
    );

    const [myProduct] = products;
    if (products.length > 0) {
      res.status(200);
      res.send(myProduct);
    } else {
      res.status(400).json({ message: 'No product' });
    }
  } catch (err) {
    res.status(400).json({
      message: err,
    });
  }
  next();
};

const addProduct = async (req, res, next) => {
  try {
    if (validateProducDetails(req.body)) {
      const id = await generateProductId();
      const item = Object.assign({}, { productId: id }, req.body);
      let newItem = await ProductsModel.create(item);

      res.status(201).json({
        message: 'Product added Successfully! with ID: ' + id,
      });
    } else {
      res.status(400).json({
        message: 'Invalid Product details.',
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
  next();
};

module.exports = {
  getProductDetails,
  getAllProducts,
  addProduct,
};
