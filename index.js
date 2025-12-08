const config = require("./config/dbconfig")
const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res)=>
{
    res.send("hello");
})

app.listen("8082",()=> console.log("server running on localhost:8082"))