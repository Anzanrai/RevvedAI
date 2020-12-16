const express = require('express');
const router = express.Router();

const Event = require("../models/event");
const {auth} = require("../middleware/auth");
const {getEvents, getEventsById, registerEvent, updateEvent, getEventsByStudentID, updateMilestone} = require("../controllers/eventController");


router.get('/', auth, getEvents);
// router.post('/', auth, registerEvent);
router.post('/', registerEvent);
router.post('/milestone/:milestoneId', updateMilestone)
router.get('/:id', getEventsById);
router.get('/events/:userID', getEventsByStudentID)
router.get('/:id', updateEvent);

module.exports = router;
