const express = require('express');
const translateController = require('../controllers/translate-controller');
const { verifyToken } = require('../middleware/auth-middleware');
const translateRouter = express.Router();

translateRouter.post('/', translateController.handleTranslation);

module.exports = translateRouter;
