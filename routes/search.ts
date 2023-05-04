import express from 'express';
import { getSearchResults } from '../controllers';

export const searchRouter = express.Router();

searchRouter.get('/', getSearchResults);
