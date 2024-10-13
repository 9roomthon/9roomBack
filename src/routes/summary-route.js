const express = require('express');
const summaryRouter = express.Router();
const summarycontroller = require('../controllers/summary-controller');
const { verifyToken } = require('../middleware/auth-middleware');

summaryRouter.post('/', verifyToken, summarycontroller.handleSummarization);

module.exports = summaryRouter;
