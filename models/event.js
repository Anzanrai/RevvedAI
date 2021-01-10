const { Timestamp } = require('mongodb');
const mongoose = require('mongoose')
// const {Milestone}= require('./milestone')
//import {Milestone} from './milestone'

// const milestoneSchema= new mongoose.Schema({
//     milestoneName:{type: String, required: true},
//     milestoneIsCompleted:{type: Boolean, default: false},
//     milestoneDueDate:{type:Date,default:false}

// });


const eventSchema= new mongoose.Schema({
    eventName:{type: String,required: true},
    eventType:{type: String, enum:['Assignment','Test','Project'], required: true},
    eventDate:{type: Date, required: true},
    eventDescription:{type: String, required: true},
    eventSubject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true},
    // addeventMilestones:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'MileStone'
    // }]
    // addeventMilestones: [{
    //     milestonetype:{type: String, enum:['Assignment','Test','Projects'],required: true},
    //     milestoneIsCompleted:{type: Boolean, default: false},
    //     milestoneProgress: {type: Number, min: 0, max: 100},
    //     milestoneDueDate:{type:Date,default:false},
    //     milestoneName: {type: String, required: true},
    //     milestonePhases: {type: String}
    // }]
});

const Event = mongoose.model('Event', eventSchema)

const milestoneSchema = new mongoose.Schema({
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'Event'},
    milestoneType: {type: String, enum: ['Assignment', 'Test', 'Project'], required: true},
    milestoneIsCompleted: {type: Boolean, default: false},
    milestoneProgress: {type: Number, min: 0, max: 100, default: 0},
    milestoneDueDate: {type: Date},
    milestoneName: {type: String, required: true},
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}
});

const Milestone = mongoose.model('Milestone', milestoneSchema)
// const createAssignmentMilestones = (eventDueDate) => {
//     let milestonetype = "Assignment";
//     let milestoneIsCompleted = false;
//     let milestoneProgress = 0;
//     let milestoneDueDate = eventDueDate;
//     let assignmentMilestonePhases = ["Plan","Analyse the question","Draft an outline","Find information","Write","Edit and Proofread"];
//     let milestones = [];

//     assignmentMilestonePhases.forEach(phase => {
//         let milestone = new Milestone({
//             milestonetype,
//             milestoneIsCompleted,
//             milestoneProgress,
//             milestoneDueDate,
//             milestoneName: phase
//         })
        
//         milestone.save()
//         .then(success => {return milestones.push(success._id)})
//         .catch(error => console.log(error))
//     });
//     return milestones;
// }

// eventSchema.pre('save', function (next) {
//     var event = this;
//     if(event.eventType === "Assignment") {
//         let assignmentMilestonePhases = ["Plan","Analyse the question","Draft an outline","Find information","Write","Edit and Proofread"];
//         let milestoneIds = []
//         assignmentMilestonePhases.forEach(phase => {
//             let milestone = new Milestone({
//                 milestonetype: "Assignment",
//                 milestoneIsCompleted: false,
//                 milestoneProgress: 0,
//                 milestoneDueDate: event.eventDueDate,
//                 milestoneName: phase
//             })
            
//             milestone.save()
//             .then(success => {milestoneIds.push(success._id)})
//             .catch(error => console.log(error))
//         })
//         console.log(milestoneIds);
//         event.addeventMilestones = milestoneIds
//         next();
//     }
// })

//const milestone = mongoose.model('MileStone', milestoneSchema)


module.exports={
    Event,
    Milestone
}