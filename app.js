// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const { auth } = require('./middleware/auth')
const { RegisterUser, LoginUser, LogoutUser, getUserDetails } = require('./controllers/authController');
const url ='mongodb://localhost:27017/studyapp'

//OTP mobile verification: 16/11/2020
// const app = require('express')()
//   , http = require('http')
//   , server = http.createServer(app)
//   , io = require('socket.io').listen(server)
//   , nStore = require('nstore')
//   , client = require('twilio')(process.env.account_sid, process.env.auth_token)
//   , speakeasy = require('speakeasy');

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

// var ouser= nStore.new('data/users.db',function(){
//     console.log("Loader users.db")
// })

// app.get('/',function(req,res){
//     res.render('index.jade')
// });

// function createUser(phone_number, code, socket) {
//     ouser.save(phone_number, {code: code, verified: false}, function (saverr) {
//       if (saverr) { throw saverr; }
//       client.sendSms({
//           to: phone_number,
//           from: process.env.twilio_number,
//           body: 'Your verification code is: ' + code
//       }, function(twilioerr, responseData) {
//         if (twilioerr) { 
//           ouser.remove(phone_number, function(remerr) {if (remerr) { throw remerr; }});
//           socket.emit('update', {message: "Invalid phone number!"});
//         } else {
//           socket.emit('code_generated');
//         }
//       });
//     });
//   }


//   function checkVerified(socket, verified, number) {
//     if (verified == true) {
//       socket.emit('reset');
//       socket.emit('update', {message: "You have already verified " + number + "!"});
//       return true;
//     }
//     return false;
//   }
  

//   io.sockets.on('connection', function(socket) {
//     console.log('socket.io connected');
//     socket.on('register', function(data) {
//       var code = speakeasy.totp({key: 'abc123'});
//       ouser.get(data.phone_number, function (geterr, doc, key) {
//         if (geterr) {
//           createUser(data.phone_number, code, socket);
//         }
//         else if (checkVerified(socket, doc.verified, data.phone_number) == false) {
//           socket.emit('update', {message: "You have already requested a verification code for that number!"});
//           socket.emit('code_generated');
//         }
//       });
  
//     });


//     socket.on('verify', function(data) {
//         ouser.get(data.phone_number, function (geterr, doc, key) {
//           if (geterr) {
//             socket.emit('reset');
//             socket.emit('update', {message: "You have not requested a verification code for " + data.phone_number + " yet!"});
//           }
//           else if (checkVerified(socket, doc.verified, data.phone_number) == false && doc.code == parseInt(data.code)) {
//             socket.emit('verified');
//             socket.emit('update', {message: "You have successfully verified " + data.phone_number + "!"});
//             users.save(data.phone_number, {code: parseInt(data.code), verified: true}, function (saverr) { if (saverr) { throw saverr; }});
//           }
//           else {
//             socket.emit('update', {message: "Invalid verification code!"});
//           }
//         });

//     })
// })
//Notification modules
// const webpush=require('web-push');
// const bodyParser =require('body-parser');
// const path=require('path');
const app =express()

// mongoose.connect(url,{useNewUrlParser:true})
// const con = mongoose.connection

// con.on('open',()=>{
//     console.log("Connected")
// })

app.use(express.json())

app.use(cookieParser());

const userRouter = require('./routes/user');
app.use('/user', userRouter);
const authRouter = require('./routes/authentication');
app.use('/auth', authRouter);

const studentRouter =require('./routes/student')
app.use('/student',studentRouter)

const eventRouter =require('./routes/event');
const { UserInstance } = require('twilio/lib/rest/chat/v1/service/user');
app.use('/event',eventRouter)

app.listen(8000, ()=>{
    console.log('Server Started')
})
