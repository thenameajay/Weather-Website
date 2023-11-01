const express = require("express")
const app = express()
const port = 8765

app.get('/',(req,res)=>{
    console.log(req.query)
    res.send(
        `<h1>welcome to my server</h1>`
    )
})

app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`)
})