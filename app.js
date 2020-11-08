const express = require('express')
const mongoose = require('mongoose')
const url ='mongodb://localhost:27017/studyapp'

//Notification modules
const webpush=require('web-push');
const bodyParser =require('body-parser');
const path=require('path');
const app =express()

//Set static path
app.use(express.static(path.join(__dirname, "client")));
app.use(bodyParser.json());

const publicVapidKey='BHb6sJc9wmjqEvnnQwTVwrKXLd4UXgI6be2dzE3mKimMy2orUPaTVNtTlzQerGT_jVepLWmTsM7dXOHRPO_H17U'
const privateVapidKey='TGvJ63-WFmxusitZn5NjDgiCpSfny-xBNYftM0NRQXQ'

webpush.setVapidDetails(
    "mailto:test@test.com",
    publicVapidKey,
    privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
    // Get pushSubscription object
    const subscription = req.body;
  
    // Send 201 - resource created
    res.status(201).json({});
  
    // Create payload
    const payload = JSON.stringify({ title: "Push Test" });
  
    // Pass object into sendNotification
    webpush
      .sendNotification(subscription, payload)
      .catch(err => console.error(err));
  });




mongoose.connect(url,{useNewUrlParser:true})
const con = mongoose.connection

con.on('open',()=>{
    console.log("Connected")
})

app.use(express.json())

const userRouter = require('./routes/user');
app.use('/user', userRouter);

const studentRouter =require('./routes/student')
app.use('/student',studentRouter)

const eventRouter =require('./routes/event')
app.use('/event',eventRouter)


app.listen(9000,()=>{
    console.log('Server Started')
})