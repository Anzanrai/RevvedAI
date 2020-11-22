// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const { auth } = require('./middleware/auth')
const { RegisterUser, LoginUser, LogoutUser, getUserDetails } = require('./controllers/authController');
// const url ='mongodb://localhost:27017/studyapp'
const url = 'mongodb+srv://anjanraiz:anjanraiz@cluster0.l82k5.mongodb.net/revvedAI?retryWrites=true&w=majority'

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://anjanraiz:<password>@cluster0.l82k5.mongodb.net/<dbname>?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const revvedAIVerifyCode = process.env.REVVEDAI_VERIFY_CODE;
const client = require('twilio')(accountSid, authToken);

// this is to create a new service in twilio
// client.verify.services.create({friendlyName: 'RevvedAI'})
//                       .then(service => console.log(service.sid));

// to send the authtoken to a mobile phone via sms
// client.verify.services(revvedAIVerifyCode)
// .verifications
// .create({to: '+61424706221', channel: 'sms'})
// .then(verification => console.log(verification.status));

// to verify the user provided token
// client.verify.services(revvedAIVerifyCode)
// .verificationChecks
// .create({to: '+61424706221', code: '046710'})
// .then(verification_check => console.log(verification_check.status));
// client.messages.create({
//     body: 'Hello from Node',
//     to: '+61424706221',  // Text this number
//     from: '+19107884144' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));
// +19107884144

const app =express()

mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true})
const con = mongoose.connection

con.on('open',()=>{
    console.log("Connected")
})

app.use(express.json())

app.use(cookieParser());

const userRouter = require('./routes/user');
app.use('/user', userRouter);
const authRouter = require('./routes/authentication');
app.use('/auth', authRouter);

const studentRouter =require('./routes/student')
app.use('/student', studentRouter)

const eventRouter =require('./routes/event');
// const { UserInstance } = require('twilio/lib/rest/chat/v1/service/user');
app.use('/event',eventRouter)

app.get('/', (req, res) => {
    res.send("Hello There")
})
app.listen(8000, ()=>{
    console.log('Server Started')
})
