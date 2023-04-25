import express, { Express, Response, Request, Application } from 'express';
import { login, logout, signup } from '../controller';

export const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/logout', logout);
