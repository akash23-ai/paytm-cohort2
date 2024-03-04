const express = require("express")
const userRouter = require('./user')
const {accountRouter} = require('./accounts')
const router = express.Router()



// Mistake 1 - need to use use
router.use('/user', userRouter);
router.use('/account', accountRouter);

module.exports = router
