const express  = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
const {MONGOURI} = require('./keys')

//Connecting to DB
mongoose.connect(MONGOURI,{
    //Warnings in console
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to database");
})

mongoose.connection.on('error',()=>{
    console.log("error connecting to database",err);
})

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(PORT,()=>{
    console.log("running on ",PORT);
})
