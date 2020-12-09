const mongoose = require('mongoose')


const milestoneSchema= new mongoose.Schema({
    milestoneName:{type: String, required: true},
    milestoneIsCompleted:{type: Boolean, default: false},

});


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


// const milestone = mongoose.model('MileStone', milestoneSchema)
const event = mongoose.model('Event', eventSchema)

module.exports={
    Event: event,
    // Milestone: milestone
}

// const milestoneSetSchema = new mongoose.Schema({
//     milestoneType: {type: String, enum: ["Assignment", "Test", "Project"], required: true},
//     milestones: [
//         {
//             milestoneTitle: {type: String, required: true}, 
//             milestoneDuedate: {type: Date, default: null, required: false}, 
//             milestoneDescription: {type: String, required: false}
//         }
//     ]
// })

// module.exports = mongoose.model('MileStone', milestoneSchema)
// module.exports = mongoose.model('Event', eventSchema)
// module.exports = mongoose.model('MilestoneTemplate', milestoneSetSchema)
// >>>>>>> Stashed changes
