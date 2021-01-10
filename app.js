// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const strategy = require('passport-facebook');
const FacebookStrategy = strategy.Strategy;
const {User, Student} = require('./models/user');
const { auth } = require('./middleware/auth')
const { RegisterUser, LoginUser, LogoutUser, getUserDetails } = require('./controllers/authController');
// const url ='mongodb://localhost:27017/studyapp'
const url = process.env.MONGODB_URL || 'mongodb+srv://anjanraiz:anjanraiz@cluster0.l82k5.mongodb.net/revvedAI?retryWrites=true&w=majority';

const PORT = process.env.PORT || 80;


// this is to create a new service in twilio
// client.verify.services.create({friendlyName: 'RevvedAI'})
//                       .then(service => console.log(service.sid));

const app =express()
const http = require('http').createServer(app)
// const app = http.createServer()
const io = require('socket.io')(http)

mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false})
const con = mongoose.connection

con.on('open',()=>{
    console.log("Connected")
})

app.use(express.json())

app.use(cookieParser());

passport.serializeUser(function(user, done) {
    done(null, user);
  });

passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["email", "name"]
      },
      function(accessToken, refreshToken, profile, done) {
        // console.log("At passport.use function", req);
          User.findOne({fbId: profile.id})
          .then(success => {
            console.log("Access Token", accessToken);
            console.log("Refresh Token", refreshToken);
              if(!!success) {
                return done(null, profile);
              }
              else {
                const { email, first_name, last_name } = profile._json;
                console.log(profile._json);
                const userData = {
                  email,
                  firstName: first_name,
                  lastName: last_name,
                  accessToken
                };
                // new User(userData).save();
                return done(null, userData);
              }
          })
          .catch(error => {
            console.log(error);
          })
        
        }
    )
);

app.use(passport.initialize());
const userRouter = require('./routes/user');
app.use('/users', userRouter);
const authRouter = require('./routes/authentication');
app.use('/auth', authRouter);

const studentRouter =require('./routes/student')
app.use('/students', studentRouter)
app.use('/students/:studentId/guardians', require('./routes/guardian'))

const eventRouter =require('./routes/event');
// const { UserInstance } = require('twilio/lib/rest/chat/v1/service/user');
app.use('/event', auth, eventRouter)
app.use('/quotes', require('./routes/quote'));
app.use('/study-contents', require('./routes/studyContent'));
app.use('/template-messages', require('./routes/templateMessage'));

app.get('', (req, res) => {
    res.send("Hello There")
})
http.listen(PORT, ()=>{
    console.log('Server Started')
})
