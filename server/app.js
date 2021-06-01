const express  = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 5000
const {MONGOURI} = require('./keys')

//Using the created model in our app
require('./models/user')
mongoose.model("User")

//Using routes
app.use(express.json())
app.use(require('./routes/auth'))


//Connecting to DB
mongoose.connect(MONGOURI,{
    //Warnings in console
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected to database");
})

mongoose.connection.on('error',(err)=>{
    console.log("error connecting to database",err);
})


app.listen(PORT,()=>{
    console.log("running on ",PORT);
})
