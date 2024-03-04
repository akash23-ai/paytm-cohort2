const express = require("express")
const userRouter = require('./routes')
const cors = require('cors')
const app = express();


app.use(cors(
    {
        origin : "*"
    }
))

// for body 
app.use(express.json());



app.use(express.urlencoded({extended : true}));


app.use('/api/v1', userRouter)

exports.app = app