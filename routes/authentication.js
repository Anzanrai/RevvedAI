const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check} = require('express-validator');
const {auth} = require('../middleware/auth');
const {userRegistrationDataValidation} = require("../middleware/auth");

const {RegisterUser, LoginUser, LogoutUser, GenerateOTPForLogin, VerifyOTPForLogin, FacebookLoginSuccess, FacebookLoginFail} = require("../controllers/authController");
const User = require("../models/user");
const {Student} = require("../models/student");

router.post('/signup', [
    check("username").custom(value => {
        return User.find({"username": value}).then(user => {
            if(!!user && user.length) {
                console.log(user);
                return Promise.reject("Username not available.")
            }
        })
    }),
    check("email").isEmail().custom(value => {
        return User.find({"email": value}).then(user=> {
            if(!!user && user.length) return Promise.reject("Email already registered.")
        })
    })
], RegisterUser);

router.post('/login', LoginUser);
router.post('/logout', LogoutUser);
router.post('/mobile/generate-otp', [
    check("phone").custom(value => {
        return Student.findOne({"phone": value}).then(student => {
            if(!student) return Promise.reject("No student found with the provided mobile number.")
        })
    })
], GenerateOTPForLogin);
router.post('/mobile/verification-otp', VerifyOTPForLogin);
router.get('/facebook', passport.authenticate("facebook", {scope: 'email'}));
router.get('/facebook/callback', passport.authenticate("facebook", {
    successRedirect: "/auth/facebook-authenticate/success",
    failureRedirect: "/auth/facebook-authenticate/fail"
}))

router.get('/facebook-authenticate/success', FacebookLoginSuccess);
router.get('/facebook-authenticate/failure', FacebookLoginFail);

module.exports = router;