const mongoose =  require("mongoose")

mongoose.connect(`mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@weatheringcluster.vaqat5a.mongodb.net/?retryWrites=true&w=majority&appName=weatheringcluster`,{useNewUrlParser:true})

const db=mongoose.connection

db.once('open',()=>{console.log("successfully connected with mongoDB")})
db.on('error',()=>{console.log("not connected with database")})

module.exports = db