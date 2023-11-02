const mongoose =  require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/WeatherDB',{useNewUrlParser:true})

const db=mongoose.connection

db.once('open',()=>{console.log("successfully connected with mongoDB")})
db.on('error',()=>{console.log("not connected with database")})

module.exports = db