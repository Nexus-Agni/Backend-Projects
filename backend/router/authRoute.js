const express = require ('express');
const { signup, signin } = require('../controller/authController');
const authRouter = express();

authRouter.post('/signup', signup)
authRouter.post('/signin', signin)

module.exports = authRouter;
