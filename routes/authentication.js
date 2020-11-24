const express = require('express');
const router = express.Router();

const {RegisterUser, LoginUser, LogoutUser} = require("../controllers/authController");

router.post('/signup', RegisterUser);
router.post('/login', LoginUser);
router.post('/logout', LogoutUser);

module.exports = router;