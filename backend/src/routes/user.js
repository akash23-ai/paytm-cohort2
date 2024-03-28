const express = require('express')
const {register, updateDetails, login, getUser, userMe} = require('../controller/user.controller');
const { authMiddleware } = require('../middleware/auth.middelware');
const userRouter = express.Router()
const {User} = require('../models/user.model')

userRouter.route('/signup').post(register)
userRouter.route('/login').post(login);
userRouter.route("/me").post(authMiddleware, userMe)
userRouter.route('/update').put(authMiddleware,updateDetails)
userRouter.route('/getUser/:id').get(authMiddleware, getUser)

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
