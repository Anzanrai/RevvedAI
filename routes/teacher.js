const express = require('express');
const router = express.Router();

const { createTeacherProfile, getTeachers, getTeacherByID } = require('../controllers/teacherController');

router.post('/', createTeacherProfile)
router.get('/', getTeachers)
router.get('/:id', getTeacherByID)