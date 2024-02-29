const mongoose =  require("mongoose")

mongoose.connect('mongodb+srv://thenameajay:qK7Fr0RZSOH40ywN@weatheringcluster.vaqat5a.mongodb.net/?retryWrites=true&w=majority&appName=weatheringcluster',{useNewUrlParser:true})

const db=mongoose.connection

db.once('open',()=>{console.log("successfully connected with mongoDB")})
db.on('error',()=>{console.log("not connected with database")})

module.exports = db