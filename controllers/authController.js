const User = require('../models/user');


exports.RegisterUser = async (req, res) => {
    const user = new User(req.body);
    user.save()
    .then(success => {
        res.status(200).json({success: true, message: "Successfully Signed Up.", success})
    })
    .catch(error => {
        res.status(422).json(error)
    })
}

exports.LoginUser = (req, res) => {
    User.findOne({'email': req.body.email})
    .then(success => {
        success.comparePassword(req.body.password, (err, isMatch)=> {
            if(!isMatch){
                return res.status(400).json({success: false, message: "Credentials provided do not match"})
            } else {
                success.generateToken((err, user) => {
                    if (err) {
                        return res.status(400).send({ err });
                    } else {
                        const data = {
                            userID: user._id,
                            username: user.username,
                            usertype: user.userType,
                            email: user.email,
                            token: user.token
                        }
                        //saving token to cookie
                        res.cookie('authToken', user.token).status(200).json({
                            success: true,
                            message: 'Successfully Logged In!',
                            userData: data
                        })
                    }
                });
            }
        })
    })
    .catch(error=> {
        res.status(400).send({success: false, message: "Credentials provided do not match."})
    })
}

exports.LogoutUser = (req, res) => {
    console.log(req.user);
    User.findByIdAndUpdate({ _id: req.user._id }, { token: ''}, (err) => {
        if (err) return res.json({ success: false, err })
        return res.status(200).send({ success: true, message: 'Successfully Logged Out!' });
    })
}
//get authenticated user details
exports.getUserDetails= (req, res) => {
    return res.status(200).json({
        isAuthenticated: true,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
    });
};
//finally in Index.js 
// const app = require('express')();
// require('dotenv').config();
// const port = process.env.PORT || 6000;
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise
// mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(cookieParser());
// app.listen(port, () => {
//  console.log(`Server running at here ${port}`);
// });
// const { auth } = require('./middleware/auth')
// const { RegisterUser, LoginUser, LogoutUser,getUserDetails } = require('./controller/AuthController');
