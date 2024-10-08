const express = require('express');
const translateController = require('../controllers/translate-controller');
const translateRouter = express.Router();

translateRouter.post('/', translateController);

module.exports = translateRouter;
