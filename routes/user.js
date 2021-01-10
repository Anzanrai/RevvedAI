const express = require('express');
const router = express.Router();

// const User = require("../models/user");
const {getUsers, getUserById, registerStudent, registerTeacher, registerGuardian} = require("../controllers/userController");


router.get('/', getUsers);
// router.post('/', register);
router.get('/:id', getUserById);

module.exports = router;