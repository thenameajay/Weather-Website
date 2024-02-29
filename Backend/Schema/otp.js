const mongoose = require("mongoose")

const otpSchema = mongoose.Schema({
    otp:{
        type : String,
        required : true,
    },
    time:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique : true,
    }
})

const Otp=mongoose.model("otps",otpSchema)
module.exports=Otp