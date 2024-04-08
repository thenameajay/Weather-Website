const express = require("express")
const app = express()
const myroutes=require('./Routes/UserRoutes')
const userSchema = require("./Schema/user")
const db = require("./DB/Db")
const bodyParser = require('body-parser')
const schedule = require('node-schedule')
const ndmlr = require('nodemailer')
const fetch = require("node-fetch")
require("dotenv").config()
const port = 8765
const cors = require('cors')

app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors({origin:['https://weatheringtoyou.onrender.com', 'https://weatheringtoyou.vercel.app']}))


// -------------------------------------------
// WORK IN PROGRESS

const MailTransporter = ndmlr.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAILID,
        pass: process.env.APP_PASSWORD,
    },
})

// FOR A SCHEDULE TASK TO RUN IN PARALLEL

schedule.scheduleJob('0 0 6 * * *', function(){
    userSchema.find().then((res)=>{
        if(res.length!=0){
            res.forEach(element => {
                if(element.subscribed==true){
                    weatherByMail(element.email, element.latitude, element.longitude)
                    console.log("mail sent to "+element.name)
                }
            });
        }
    })
})

// -----------------------------------------


// app.get('/',(req,res)=>{
//     console.log(req.query)
//     res.send(
//         `<h1>welcome to my server</h1>`
//     )
// })

function weatherByMail(weatherMail, lat, lon){
    userSchema.find
    const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPEN_WEATHER_MAP}`
    fetch(url).then((r1)=>{
        return r1.json()
    }).then((rslt)=>{
        console.log(rslt)
        MailTransporter.sendMail({
            from: `"Weathering"<${process.env.EMAILID}>`,
            to: weatherMail,
            subject: "Today's weather",
            text: "Weather Today",
            html: `
            <div style="background-color:white ; padding:5px">
                <h2 style="color:black ; self-align:center">Weather Today</h2>
                Weather : ${rslt.weather[0].description}
                <br/>
                City : ${rslt.name}
                <br/>
                Temperature : ${String(rslt.main.temp-273.15).slice(0,5)}&deg;C
                <br/>
                Feels Like : ${String(rslt.main.feels_like-273.15).slice(0,5)}&deg;C
                <br/>
                Pressure : ${rslt.main.pressure} hPa
                <br/>
                Humidty : ${rslt.main.humidity} %
                <br/>
                Visibility : ${rslt.visibility}
            </div>
            <a href="https://weatheringtoyou.onrender.com/unsubscribe-us">Unsubscribe Weathering</a>
            
            `
        })
    })
}

app.use('/',myroutes)

app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`)
})

// Mon Nov 06 2023 22:50:03 GMT+0530 (India Standard Time)
