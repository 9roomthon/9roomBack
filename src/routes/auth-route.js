const express = require('express');
const authController = require('../controllers/auth-contoller');

const authRouter = express.Router();

authRouter.get('/google', authController.googleLogin);

authRouter.get('/google/callback', authController.googleCallback);

module.exports = authRouter;
