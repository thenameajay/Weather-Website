const express = require("express")
const app = express()
const myroutes=require('./Routes/UserRoutes')
const db = require("./DB/Db")
const bodyParser = require('body-parser')
const port = 8765

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// app.get('/',(req,res)=>{
//     console.log(req.query)
//     res.send(
//         `<h1>welcome to my server</h1>`
//     )
// })


// const fetch = require("node-fetch")
// function tellWeather(){
//     const url ="https://api.openweathermap.org/data/2.5/weather?lat=27.031973&lon=75.893893&appid=0a632f7c0ee705cdce05e73286e0149e"
//     fetch(url).then((r1)=>{
//         console.log(r1.json())
//     })
// }

app.use('/',myroutes)

app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`)
})