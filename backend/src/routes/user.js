const express = require('express')
const {register, updateDetails, login} = require('../controller/user.controller');
const { authMiddleware } = require('../middleware/auth.middelware');
const userRouter = express.Router()
const {User} = require('../models/user.model')

userRouter.route('/signup').post(register)
userRouter.route('/login').post(authMiddleware, login);
userRouter.route('/update').put(authMiddleware,updateDetails)

// need to understand
userRouter.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = userRouter
