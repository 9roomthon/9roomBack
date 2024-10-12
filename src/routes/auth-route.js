const express = require('express');
const authController = require('../controllers/auth-contoller');

const authRouter = express.Router();

authRouter.post('/save-user', authController.saveGoogleUser);

module.exports = authRouter;
