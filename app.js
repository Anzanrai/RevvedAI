// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport');
const strategy = require('passport-facebook');
const FacebookStrategy = strategy.Strategy;
const User = require('./models/user');
const { auth } = require('./middleware/auth')
const { RegisterUser, LoginUser, LogoutUser, getUserDetails } = require('./controllers/authController');
// const url ='mongodb://localhost:27017/studyapp'
const url = 'mongodb+srv://anjanraiz:anjanraiz@cluster0.l82k5.mongodb.net/revvedAI?retryWrites=true&w=majority'

const PORT = process.env.PORT || 8080


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
          User.findOne({fbId: profile.id})
          .then(success => {
              if(!!success) {
                return done(null, profile);
              }
              else {

              }
          })
          .catch(error)
        const { email, first_name, last_name } = profile._json;
        console.log(profile._json);
        const userData = {
          email,
          firstName: first_name,
          lastName: last_name
        };
        new User(userData).save();
        done(null, profile);
        }
    )
);
// passport.use('facebook', new FacebookStrategy({
//     clientID        : process.env.FACEBOOK_APP_ID,
//     clientSecret    : process.env.FACEBOOK_APP_SECRET,
//     callbackURL     : process.env.FACEBOOK_CALLBACK_URL
//   },
   
//     // facebook will send back the tokens and profile
//     function(access_token, refresh_token, profile, done) {
//       // asynchronous
//       process.nextTick(function() {
//           console.log(profile);
//         // find the user in the database based on their facebook id
//         User.findOne({ 'id' : profile.id }, function(err, user) {
   
//           // if there is an error, stop everything and return that
//           // ie an error connecting to the database
//           if (err)
//             return done(err);
   
//             // if the user is found, then log them in
//             if (user) {
//               return done(null, user); // user found, return that user
//             } else {
//               // if there is no user found with that facebook id, create them
//               var newUser = new User();
   
//               // set all of the facebook information in our user model
//               newUser.fb.id    = profile.id; // set the users facebook id                 
//               newUser.fb.accessToken = access_token; // we will save the token that facebook provides to the user                    
//               newUser.fb.firstName  = profile.name.givenName;
//               newUser.fb.lastName = profile.name.familyName; // look at the passport user profile to see how names are returned
//               newUser.fb.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first
   
//               // save our user to the database
//               newUser.save(function(err) {
//                 if (err)
//                   throw err;
   
//                 // if successful, return the new user
//                 return done(null, newUser);
//               });
//            } 
//         });
//       });
//   }));
app.use(passport.initialize());
const userRouter = require('./routes/user');
app.use('/user', userRouter);
const authRouter = require('./routes/authentication');
app.use('/auth', authRouter);

const studentRouter =require('./routes/student')
app.use('/student', studentRouter)

const eventRouter =require('./routes/event');
// const { UserInstance } = require('twilio/lib/rest/chat/v1/service/user');
app.use('/event', eventRouter)
app.use('/quotes', require('./routes/quote'));

app.get('/', (req, res) => {
    res.send("Hello There")
})
http.listen(PORT, ()=>{
    console.log('Server Started')
})
