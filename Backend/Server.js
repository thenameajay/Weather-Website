const express = require("express")
const app = express()
const myroutes=require('./Routes/UserRoutes')
const userSchema = require("./Schema/user")
const db = require("./DB/Db")
const bodyParser = require('body-parser')
const schedule = require('node-schedule')
const ndmlr = require('nodemailer')
require("dotenv").config()
const port = 8765
const cors = require('cors')

app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


// -------------------------------------------
// WORK IN PROGRESS

// FOR A SCHEDULE TASK TO RUN IN PARALLEL
// IN WORKING CONDITION

// schedule.scheduleJob('*/5 * * * * *', function(){
//     console.log("hii i am ajay")
// })

// const MailTransporter = ndmlr.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: process.env.EMAILID,
//         pass: process.env.APP_PASSWORD,
//     },
// })

// userSchema.find().then((res)=>{
//     let allUsersEmail=[]
//     console.log(res)
//     console.log(res[1].name)

//     res.forEach(element => {
//         allUsersEmail.push(element.email)
//     });

//     console.log(allUsersEmail)
// })

// transporter.sendMail({
//     from: `"Weathering"<${process.env.EMAILID}>`,
//     to: email,
//     subject: "OTP verification",
//     text: "OTP mail",
//     html: `
//     <div style="background-color:white">
//         <h2 style="color:black">Hello ${name} </h2>
//         Your OTP for registering to Weathering is ${otp} .
//         <br/>
//         Please ignore if it not belongs to you and never share otp with anyone.
//         <br/>
//         Thank You for Registering.
//         <br/>
//         Team Weathering
//     </div>
//     `

// })

// -----------------------------------------


// app.get('/',(req,res)=>{
//     console.log(req.query)
//     res.send(
//         `<h1>welcome to my server</h1>`
//     )
// })


// const fetch = require("node-fetch")
// function tellWeather(){
//     const url ="https://api.openweathermap.org/data/2.5/weather?lat=latitude&lon=longitude&appid=api-key-h-ye"
//     fetch(url).then((r1)=>{
//         console.log(r1.json())
//     })
// }


app.use('/',myroutes)

app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`)
})

// Mon Nov 06 2023 22:50:03 GMT+0530 (India Standard Time)