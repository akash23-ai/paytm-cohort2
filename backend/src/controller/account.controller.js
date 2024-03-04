const zod = require("zod")
const { Account } = require("../models/bank.model")
const { default: mongoose } = require("mongoose")




const getBalance = async(req, res) => {

    console.log(req.userId)
    try {
        const balance = await Account.findOne(
            {
                userId : req.userId
            },
            
        )
    
        if(!balance) return res.status(401).json({message : "No Balace is there"})
    
        return res.status(200).json({balance : balance.balance , message : "Balance is Present"})
    } catch (error) {
        console.log("Error at getBalance")
    }
}


// this is based on transactions
const sendMoney = async (req, res) => {
    console.log("Hi there")
    const session = await mongoose.startSession();

    (await session).startTransaction()

    const {amount, to} = req.body;

    const account = await Account.findOne({
        userId : req.userId,
    }).session(session)

    console.log(account)

    if(!account || account.balance < amount){
        (await session).abortTransaction()
        return res.status(401).json({message : "Not Enough Balance"})
    }

    const toAccount = await Account.findOne({
        userId : to
    }).session(session);

    if(!toAccount){
        (await session).abortTransaction();
        return res.status(401).json({message : "Not A Valid Account"});
    }

    await Account.updateOne({userId : req.userId}, {$inc : {
        balance : -amount
    }}).session(session);
    await Account.updateOne({userId : to }, {$inc: {
        balance : amount
    }}).session(session);

    (await session).commitTransaction()

    return res.status(200).json({
        message : "Transfer Successfull"
    })


}

module.exports = {
    getBalance,
    sendMoney
}