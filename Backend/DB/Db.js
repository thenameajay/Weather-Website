const mongoose =  require("mongoose")
require("dotenv").config()

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@weatheringcluster.vaqat5a.mongodb.net/?retryWrites=true&w=majority&appName=weatheringcluster`,{useNewUrlParser:true})
// mongoose.connect(`mongodb://127.0.0.1:27017/Weathering`,{useNewUrlParser:true})

const db=mongoose.connection

db.once('open',()=>{console.log("successfully connected with mongoDB")})
db.on('error',()=>{console.log("not connected with database")})

module.exports = db