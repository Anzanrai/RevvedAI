const express = require('express')
const mongoose = require('mongoose')
const url ='mongodb://localhost:27017/studyapp'

const app =express()
mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open',()=>{
    console.log("Connected")
})

app.use(express.json())

const studentRouter =require('./routes/student')
app.use('/student',studentRouter)

const eventRouter =require('./routes/event')
app.use('/event',eventRouter)

app.listen(8000,()=>{
    console.log('Server Started')
})