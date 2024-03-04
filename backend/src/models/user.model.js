const mongoose = require("mongoose")



const userSchema = new mongoose.Schema(
    {
        username : {
            type : String,
            unique : true,
            required : true
        },
        firstName : {
            type : String,
            required : true
        },
        lastName : {
            type : String,
            required : true
        },
        token : {
            type : String,
        },
        password : {
            type : String, 
            required : true,
            max : 50
        }
    }, 
    {
        timestamps : true
    }
);



const User = mongoose.model("User", userSchema);

module.exports = { 
    User
}