// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const { auth } = require('./middleware/auth')
const { RegisterUser, LoginUser, LogoutUser,getUserDetails } = require('./controllers/authController');
const url ='mongodb://localhost:27017/studyapp'

//Notification modules
// const webpush=require('web-push');
// const bodyParser =require('body-parser');
const path=require('path');
const app =express()

mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open',()=>{
    console.log("Connected")
})

app.use(express.json())
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const userRouter = require('./routes/user');
app.use('/user', userRouter);
app.post('/api/users/register', RegisterUser);
app.post('/api/users/login', LoginUser);
app.get('/api/users/auth', auth, getUserDetails);
app.get('/api/users/logout', auth, LogoutUser);

const studentRouter =require('./routes/student')
app.use('/student',studentRouter)

const eventRouter =require('./routes/event')
app.use('/event',eventRouter)

app.listen(8000, ()=>{
    console.log('Server Started')
})