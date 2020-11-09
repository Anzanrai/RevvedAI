const express = require('express');
const router = express.Router();

const User = require("../models/user");
const {getUsers, getUserById, registerUser} = require("../controllers/userController");


router.get('/', getUsers);
router.post('/', registerUser);
router.get('/:id', getUserById);

module.exports = router;