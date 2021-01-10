const express = require('express');
const router = express.Router();

const Event = require("../models/event");
const {auth} = require("../middleware/auth");
const {getEvents, getEventsById, registerEvent, updateEvent, getEventSpecificMilestones, 
    updateMilestone, getPendingMilestones, getPendingMilestonesForStatusUpdate} = require("../controllers/eventController");


router.get('/', getEvents);
router.post('/', registerEvent);
// router.post('/', registerEvent);
router.patch('/:id', updateEvent);

router.get('/pending-milestones-count', getPendingMilestones);
router.get('/:id/milestones', getEventSpecificMilestones);
router.get('/pending-milestones', getPendingMilestonesForStatusUpdate)
router.patch('/:id/milestones/:milestoneId', updateMilestone)
router.get('/:id', getEventsById);
// router.get('/events/:userID', getEventsByStudentID)

module.exports = router;
