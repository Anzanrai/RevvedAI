const {Event, Milestone} = require('../models/event');
const {TemplateMessage} = require('../models/templateMessage');
// const {Milestone} = require('../models/milestone');
const { successResponse, errorResponse } = require('../middleware/responseFormat');
const { db } = require('../models/event');

const getEvents = (req, res) => {
    // const studentId = req.query.studentId;
    let filterParams = Object.assign({}, req.query);
    filterParams['student'] = req.user.id;
    Event.find(filterParams)
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


const registerEvent = (req, res) => {
    let eventObj = Object.assign({}, req.body);
    eventObj['student'] = req.user.id;
    let event  = new Event(eventObj);
    event.save()
    .then(success=> {
        return success
    })
    .then(success => {
        getMilestonePhases(event.eventType)
        .then(milestonephases => {
            milestonephases.map(phase => {
                let milestone = new Milestone({
                    'event': success.id,
                    'milestoneType': event.eventType,
                    'milestoneDueDate': event.eventDate,
                    'milestoneName': phase,
                    'student': req.user.id
                })
                milestone.save()
            })
        })
        .catch(error => {
            res.status(400).json(errorResponse(error, res.statusCode));
        })
        // console.log(milestonephases);
        
        res.status(201).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error=> {
        console.log(error);
        res.status(400).json(errorResponse("Error creating an event.", res.statusCode));
    })
}


const updateEvent = (req, res) => {
    Event.findOneAndUpdate(req.params.id, {$set: req.body})
    .then(success=> {
        res.status(200).json(successResponse("Updated Successfully", success, res.statusCode));
    })
    .catch(error=> {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getPendingMilestones = (req, res) => {
    // console.log("At getMilestones", req.user);
    let filterParams = {
        student: req.user.id,
        milestoneIsCompleted: false,
        milestoneDueDate: {$gte: new Date()}
    }
    // Milestone.find()
    Milestone.count(filterParams)
    .then(success => {
        res.status(200).json(successResponse("OK", success.toString()+" Pending Action Items for today.", res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getPendingMilestonesForStatusUpdate = (req, res) => {
    let filterParams = {
        student: req.user.id,
        milestoneIsCompleted: false,
        milestoneDueDate: {$gte: new Date()}
    }
    Milestone.find(filterParams)
    .then(success => {
        if(success.length){
            let responseObjects = [];
            TemplateMessage.findOne({"tag": "milestone-status-update"})
            .then(templateMessage => {
                success.map(milestone => {
                    let {event, milestoneType, milestoneIsCompleted, milestoneDueDate, milestoneName, milestoneProgress, student} = milestone;
                    let [messagePartOne, messagePartTwo] = templateMessage.template[0].message.split(",");
                    let resObj = {
                        displayMessage: messagePartOne+" "+milestone.milestoneName+" "+messagePartTwo,
                        id: milestone.id,
                        event,
                        milestoneType,
                        milestoneIsCompleted,
                        milestoneProgress,
                        milestoneDueDate,
                        milestoneName,
                        student
                    }
                    responseObjects.push(resObj);
                })
                res.status(200).json(successResponse("OK", responseObjects, res.statusCode));
            })
            .catch(error => {
                console.log("Inner block", error);
                res.status(400).json(errorResponse(error, res.statusCode));
            })
        }
    })
    .catch(error => {
        console.log("Outer block", error);
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getEventSpecificMilestones = (req, res) => {
    Milestone.find({event: req.params.id})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const updateMilestone = (req, res) => {
    let filterParams = {
        'student': req.user.id,
        '_id': req.params.milestoneId
    }
    Milestone.findOneAndUpdate(filterParams, {$set: req.body}, {new: true})
    .then(success => {
        res.status(200).json(successResponse("Updated Successfully", success, res.statusCode))
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode))
    })
};

module.exports = {
    getEvents,
    getEventsById,
    updateEvent,
    registerEvent,
    getEventsByStudentID,
    updateMilestone,
    getPendingMilestones,
    getEventSpecificMilestones,
    getPendingMilestonesForStatusUpdate
}