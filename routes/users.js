const express = require('express');
const userRouter = express.Router();
const { login, signup, logout } = require('../controller/userController');

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/logout', logout);

module.exports = userRouter;
