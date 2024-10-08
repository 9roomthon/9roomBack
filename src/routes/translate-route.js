const express = require('express');
const translateController = require('../controllers/translate-controller');
const { verifyToken } = require('../middleware/auth-middleware');
const translateRouter = express.Router();

translateRouter.post('/', verifyToken, translateController);

module.exports = translateRouter;
