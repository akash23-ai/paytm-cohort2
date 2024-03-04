const express = require('express');
const { authMiddleware } = require('../middleware/auth.middelware');
const { getBalance, sendMoney } = require('../controller/account.controller');

const accountRouter = express.Router();

accountRouter.route('/balance').get(authMiddleware, getBalance)
accountRouter.route('/transfer').post(authMiddleware, sendMoney)


module.exports = {
    accountRouter
}