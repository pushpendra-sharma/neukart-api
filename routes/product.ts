import express, { Express, Response, Request, Application } from 'express';
import { addProduct, getAllProducts, getProductDetails } from '../controller';

export const productRouter = express.Router();

productRouter.post('/addProduct', addProduct);
productRouter.get('/', getAllProducts);
productRouter.get('/:productId', getProductDetails);
