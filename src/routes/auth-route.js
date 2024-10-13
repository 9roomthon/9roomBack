const express = require('express');
const authController = require('../controllers/auth-contoller');

const authRouter = express.Router();

authRouter.post('/convert-token', authController.saveGoogleUser);

module.exports = authRouter;
