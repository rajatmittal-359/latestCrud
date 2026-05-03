const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    confirmPassword:{
        type:String
    },
    otp:{
        type:Number
    },
     otpExpiry: {
        type: Date,
        select: false
        }
},{
    timestamps:true
})


module.exports = mongoose.model("User",userSchema)