const User = require('../models/user');
const {Student} = require("../models/student");
const {successResponse, validationErrorResponse, errorResponse} = require("../middleware/responseFormat");
const {validationResult} = require("express-validator");

// env variables for Twilio OTP
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const revvedAIVerifyCode = process.env.REVVEDAI_VERIFY_CODE;
const client = require('twilio')(accountSid, authToken);

const generateOTP = (phone) => {
    
}


exports.RegisterUser = async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return res.status(400).json(validationErrorResponse(errors));
    }
    const user = new User(req.body);
    // console.log(req.body)
    user.save()
    .then(success => {
        res.status(200).json(successResponse("Successfully Signed Up.", success, res.statusCode))
    })
    .catch(error => {
        res.status(422).json(errorResponse(error, res.statusCode))
    })
}

exports.GenerateOTPForLogin = (req, res) => {
    const {phone} = req.body;
    Student.findOne({"phone": phone}).then(student => {
        if(!student) {
            res.status(404).json(errorResponse("Student with the associated phone number not found", res.statusCode))
        }
        else {
            client.verify.services(revvedAIVerifyCode)
            .verifications
            .create({to: phone.toString(), channel: 'sms'})
            .then(verification => res.status(200).json(successResponse("OTP has been sent to XXXXXXX"+phone.toString().substring(phone.toString().length -4, phone.toString().length), verification, res.statusCode)))
            .catch(error => res.status(400).json(error))
        }
    })
    
}

// verify otp and if successful, generate authToken and send it embedding in cookie
exports.VerifyOTPForLogin = (req, res) => {
    const phone = req.body.phone;
    const otp = req.body.otp;
    let status = "pending";
    let valid = false;
    let user = {};

    User.findOne({"phone": phone})
    .then(success => {user = success})
    .catch(error => console.log(error))
    const resultObj = client.verify.services(revvedAIVerifyCode)
    .verificationChecks
    .create({to: phone.toString(), code: otp.toString()})
    .then(verification_check => {
        status = verification_check.status
        valid = verification_check.valid
        if(valid && status === "approved"){
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(400).json(errorResponse(err, res.statusCode));
                } else {
                    const data = {
                        userID: user._id,
                        username: user.username,
                        usertype: user.userType,
                        email: user.email,
                    }
                    //saving token to cookie
                    res.cookie('authToken', user.token).status(200).json(successResponse("OTP verification successful!!", data, res.statusCode))
                }
            })
        }
    })
    .catch(error => res.status(400).json(errorResponse("OTP verification failed.", res.statusCode)))
}

exports.LoginUser = (req, res) => {
    User.findOne({'email': req.body.email})
    .then(success => {
        success.comparePassword(req.body.password, (err, isMatch)=> {
            if(!isMatch){
                res.status(400).json(errorResponse("Credentials provided did not match", res.statusCode))
            } else {
                success.generateToken((err, user) => {
                    if (err) {
                        return res.status(400).json(errorResponse(err, res.statusCode));
                    } else {
                        const data = {
                            userID: user._id,
                            username: user.username,
                            usertype: user.userType,
                            email: user.email,
                        }
                        //saving token to cookie
                        res.cookie('authToken', user.token).status(200).json(successResponse("LoggedIn successfully!!", data, res.statusCode))
                    }
                });
            }
        })
    })
    .catch(error=> {
        console.log(error)
        // res.status(400).send({success: false, message: "Credentials provided do not match."})
        res.status(500).json(errorResponse("Something went wrong.", res.statusCode))
    })
}

exports.LogoutUser = (req, res) => {
    console.log(req.user);
    User.findByIdAndUpdate({ _id: req.user._id }, { token: ''}, (err) => {
        if (err) return res.status(400).json(errorResponse(error, res.statusCode))
        return res.status(200).json(successResponse("Successfully Logged out.", res.statusCode));
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

exports.FacebookLoginSuccess = (req, res) => {
    return res.send("Facebook login successful");
}

exports.FacebookLoginFail = (req, res) => {
    return res.send("Facebook login failed");
}
