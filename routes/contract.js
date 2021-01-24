const express = require('express');

const router = express.Router();
const {auth} = require('../middleware/auth');
const {getLoggedInHomeScreen, registerContract, getPersonalDetailScreen, getContracts, getPersonalDetailUpdateScreen, 
    getStatusUpdateScreen, getSplashScreen, getWelcomeScreen, getComponent, createComponent, updateComponent, 
    getMobileNumberEntryScreenContract, getOtpEntryScreen, getRegistrationWelcomeScreen1} = require('../controllers/contracts');


router.get('/', getContracts);
router.get('/components', getComponent);
router.post('/components', createComponent);
router.patch('/components/:componentId', updateComponent);
router.get('/splashScreen', getSplashScreen);
router.get('/welcomeScreen', getWelcomeScreen);
router.get('/loggedInHomeScreen', auth, getLoggedInHomeScreen);
router.get('/personalDetailScreen', auth, getPersonalDetailScreen);
router.get('/eqWellbeingStatusScreen', auth, getStatusUpdateScreen);
router.get('/personalDetailUpdateScreen', auth, getPersonalDetailUpdateScreen);
router.get('/mobileEntryScreen', getMobileNumberEntryScreenContract);
router.get('/otpEntryScreen', getOtpEntryScreen);
router.get('/registrationWelcomeScreen1', getRegistrationWelcomeScreen1);
router.post('/', registerContract);

module.exports = router;