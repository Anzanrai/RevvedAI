const express = require('express');
const router = express.Router();

const Milestone = require("../models/milestone");
const {getTest, getProject, getAssignment, 
    getTestById, getProjectById, getAssignmentById, 
    registerTest, registerProject, registerAssignment,
    updateTest, updateProject, updateAssignment} = require("../controllers/milestoneController");


router.get('/test/', getTest);
router.get('/', getProject);
router.get('/assignment/', getAssignment);

router.get('/:id', getTestById);
router.get('/:id', getProjectById);
router.get('/:id', getAssignmentById);

router.post('/test', registerTest);
router.post('/', registerProject);
router.post('/assignment/', registerAssignment);


router.get('/test/:id', updateTest);
router.get('/:id', updateProject);
router.get('/assignment/:id', updateAssignment);

module.exports = router;