const mongoose = require("mongoose")

const newUserSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    email:{
        type:String,
        required:true,
        // unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    latitude:{
        type: String,
        required:true
    },
    longitude:{
        type: String,
        required:true
    }
})

const NewUser=mongoose.model("newusers",newUserSchema)
module.exports=NewUser