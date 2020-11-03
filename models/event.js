const mongoose = require('mongoose')


const milestoneSchema= new mongoose.Schema({
    milestoneName:{type: String, required: true},
    milestoneIsCompleted:{type: Boolean, default: false},

});

module.exports = mongoose.model("MileStone", milestoneSchema)

const eventSchema= new mongoose.Schema({
    eventName:{type: String,required: true},
    eventType:{
                type: String,
                enum:['Assignment','Test','Projects'],
                required: true},
    eventDate:{type: Date,required: true},
    eventDescription:{type: String,required: true},

    addeventMilestones:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MileStone'
    }]
});

module.exports = mongoose.model('MileStone', milestoneSchema)
module.exports = mongoose.model('Event', eventSchema)