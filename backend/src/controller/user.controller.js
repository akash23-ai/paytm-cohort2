const zod = require('zod')
const {User} = require('../models/user.model')
const jwt = require('jsonwebtoken')
const {Account} = require("../models/bank.model")

const signUpValidation = zod.object({
    username : zod.string(),
    password : zod.string(),
    firstName : zod.string(),
    lastName : zod.string()
})


const register = async (req, res) => {
    const success = signUpValidation.safeParse(req.body);
    if(!success) return res.status(411).json({message : "Error while validating"})

    const {username, firstName, lastName, password} = req.body

    const exitingUser = await User.findOne({username});
    console.log(exitingUser)

    if(exitingUser) return res.status(401).json({message : "User is Already Present"})



    const token = await jwt.sign(username, process.env.JWT_SECRET);

    console.log(token, " Token is there")
    if(!token) res.status(501).json({message : "Token is not generated"})

    const user = await User.create({
        username,
        firstName,
        lastName,
        password,
        token
    })
    await user.save();



    const createdUser = await User.findById(user._id).select("-token");

    await Account.create(
       {
        userId : createdUser.username,
        balance : Math.floor(Math.random() * 10000 + 1)
       }
    )

    return res.status(200).json({createdUser, message : "User is successfully created", token})
}


const updateBody = zod.object(
    {
        password : zod.string().optional(),
        firstName : zod.string().optional(),
        lastName : zod.string().optional()
    }
)

const updateDetails = async(req, res) => {
    const success = updateBody.safeParse(req.body);
    if(!success){
        return res.status(403).json("Inputs are Invalid")
    }
    const updatedUser = await User.updateOne(
      {username : req.userId},
      req.body
    )

    return res.status(200).json({updatedUser, message :"user updated successfully"});
}



const login = async (req, res) => {
  const user = await User.findOne({username : req.userId})
  
  if(!user) return res.status(404).json({message : "No User Found"})

  return res.status(200).json({user, message: "User is here"})
}

const getUser = async (req, res) => {
    const {id} = req.params;

    const user = await User.findById(id);

    if(!user) return res.status(404).json({message : "User Not Found"})

    return res.status(200).json({user, message : "This is your user"})
}

module.exports = {
    register,
    updateDetails,
    login,
    getUser
}