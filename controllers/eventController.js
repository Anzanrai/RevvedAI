const {Event} = require('../models/event');

const getEvents = (req, res) => {
    Event.find()
    .then(success => {
        res.json(success)
    })
    .catch(error=> {
        res.status(400).send("Bad request, users not found.")
    })
}


const getEventsById = (req, res) => {
    Event.findById(req.params.id)
    .then(success=> {
        res.json(success)
    })
    .catch(error=> {
        res.status(404).send("User not found")
    })
}


const registerEvent = (req, res) => {
    let event  = new Event({
        eventName: req.body.eventName,
        eventType: req.body.eventType,
        eventDate: req.body.eventDate,
        eventDueDate:req.body.eventDueDate,
        eventDescription: req.body.eventDescription
    })
    event.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
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

module.exports = {
    getEvents,
    getEventsById,
    updateEvent,
    registerEvent
}