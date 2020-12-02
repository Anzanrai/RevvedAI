const express = require('express');
const router = express.Router();

const {RegisterUser, LoginUser, LogoutUser, GenerateOTPForLogin, VerifyOTPForLogin, FacebookLoginSuccess, FacebookLoginFail} = require("../controllers/authController");
const passport = require('passport');

router.post('/signup', RegisterUser);
router.post('/login', LoginUser);
router.post('/logout', LogoutUser);
router.post('/mobile/generate-otp', GenerateOTPForLogin);
router.post('/mobile/verification-otp', VerifyOTPForLogin);
router.get('/facebook', passport.authenticate("facebook", {scope: 'email'}));
router.get('/facebook/callback', passport.authenticate("facebook", {
    successRedirect: "/auth/facebook-authenticate/success",
    failureRedirect: "/auth/facebook-authenticate/fail"
}))

router.get('/facebook-authenticate/success', FacebookLoginSuccess);
router.get('/facebook-authenticate/failure', FacebookLoginFail);

module.exports = router;