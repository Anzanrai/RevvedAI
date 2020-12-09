const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
const {Milestone}= require('./milestone')
//import {Milestone} from './milestone'

// const milestoneSchema= new mongoose.Schema({
//     milestoneName:{type: String, required: true},
//     milestoneIsCompleted:{type: Boolean, default: false},
//     milestoneDueDate:{type:Date,default:false}

// });


const eventSchema= new mongoose.Schema({
    eventName:{type: String,required: true},
    eventType:{type: String, enum:['Assignment','Test','Projects'], required: true},
    eventDate:{type: Date, required: true},
    eventDescription:{type: String, required: true},
    eventSubject: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
    addeventMilestones:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MileStone'
    }]
});

//const milestone = mongoose.model('MileStone', milestoneSchema)
const event = mongoose.model('Event', eventSchema)

module.exports=event