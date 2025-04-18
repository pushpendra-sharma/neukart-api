import express from 'express';
import { addProduct, getAllProducts, getProductDetails } from '../controllers';

export const productRouter = express.Router();

productRouter.post('/addProduct', addProduct);
productRouter.get('/', getAllProducts);
