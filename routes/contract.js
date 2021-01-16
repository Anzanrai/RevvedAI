const express = require('express');

const router = express.Router();
const {auth} = require('../middleware/auth');
const {getLoggedInHomeScreen, registerContract} = require('../controllers/contracts');


router.get('/loggedInHomeScreen', auth, getLoggedInHomeScreen);
router.post('/', registerContract);

module.exports = router;