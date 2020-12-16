const Event = require('../models/event');
const {Milestone} = require('../models/milestone');
const { successResponse, errorResponse } = require('../middleware/responseFormat');
const { db } = require('../models/event');

const getEvents = (req, res) => {
    // const studentId = req.query.studentId;

    Event.find(req.query)
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error=> {
        res.status(400).json(errorResponse(("Bad request, users not found.", res.statusCode)))
    })
}


const getEventsById = (req, res) => {
    Event.findById(req.params.id)
    .then(success=> {
        res.status(200).json(successResponse("OK", success, res.statusCode))
    })
    .catch(error=> {
        res.status(404).json(errorResponse("User not found", res.statusCode))
    })
}


const getEventsByStudentID = (req, res) => {
    Event.find({"student": req.params.userID})
    .then(events => {
        res.status(200).json(successResponse("OK", events, res.statusCode))
    })
    .catch(error => {
        res.status(400).json(errorResponse("Bad Request", res.statusCode))
    })
}


const getMilestonePhases = async (eventType) => {
    switch(eventType){
        case 'Assignment':
            return ["Plan","Analyse the question","Draft an outline","Find information","Write","Edit and Proofread"];
        case 'Test':
            return ["Organizing the notes", "Revise Actively", "Recalling the answers", "Practise different kind of questions"];
        case 'Project':
            return ["Deciding on a project", "Planning out for the project", "Researching the project", "Creating your project"];
    }
}


const registerEvent = async (req, res) => {
    let event  = new Event(req.body)
    let milestonephases = await getMilestonePhases(event.eventType);
    milestonephases.forEach(phase => {
        event.addeventMilestones.push({
            "milestonetype": event.eventType,
            "milestoneIsCompleted": false,
            "milestoneProgress": 0,
            "milestoneDueDate": event.eventDate,
            "milestoneName": phase,
        })
    })
    event.save()
    .then(success=> {
        res.status(201).json(successResponse("Event Created", success, res.statusCode));
    })
    .catch(error=> {
        res.status(400).json(errorResponse("Error creating an event.", res.statusCode));
    })
}


const updateEvent = (req, res) => {
    let event = Event.findById(req.params.id)
        event.eventName= req.body.eventName
        event.eventType=req.body.eventType
        event.eventDate= req.body.eventDate
        event.eventDueDate=req.body.eventDueDate
        event.eventDescription= req.body.eventDescription
    event.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}

const updateMilestone = (req, res) => {
    let {eventId, milestoneId} = req.params;
    let payload = {};
    let updateObject = {};

    // make a copy of request payload
    Object.assign(payload, req.body);
    // const payload = req.body;
    // console.log(payload)

    // create a new object with update field names for sub-documents.
    for( const [key, value] of Object.entries(payload)){
        let keyName = 'addeventMilestones.$.' + key;
        updateObject[keyName] = value
    }
    
    // find and update sub-document with provided payload.
    Event.findOneAndUpdate({"addeventMilestones._id": milestoneId}, {$set: updateObject})
    .then(success => res.status(200).json(successResponse("OK", success, res.statusCode)))
    .catch(error=> res.status(500).json(errorResponse(error, res.statusCode)))
};

module.exports = {
    getEvents,
    getEventsById,
    updateEvent,
    registerEvent,
    getEventsByStudentID,
    updateMilestone
}