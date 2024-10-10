const express = require('express');
const summaryRouter = express.Router();
const summarycontroller = require('../controllers/summary-controller');

summaryRouter.post('/', summarycontroller.handleSummarization);

module.exports = summaryRouter;
