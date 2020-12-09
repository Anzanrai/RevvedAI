const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')


const milestoneSchema= new mongoose.Schema({
    milestonetype:{type: String, enum:['Assignment','Test','Projects'],required: true},
    milestoneIsCompleted:{type: Boolean, default: false},
    milestoneProgress: {type: Number, min: 0, max: 100},
    milestoneDueDate:{type:Date,default:false}
});


const testmilestoneSchema = extendSchema(milestoneSchema,{
    milestoneName:{
        type:[{type: String, 
            enum:["Organizing the notes","Revise Actively","Recalling the answers","Practise different kind of questions"]}],
            required: true
    },
    milestonePhases:[{
        type: String
    }]
});


const projectmilestoneSchema = extendSchema(milestoneSchema,{
    milestoneName:{
        type:[{type: String, 
            enum:["Deciding on a project","Planning out for the project","Researching the project","Creating your project"]}],
            required: true
    },
    milestonePhases:[{
        type: String
    }]
});


const assignmentmilestoneSchema = extendSchema(milestoneSchema,{
    milestoneName:{
        type:[{type: String, 
            enum:["Plan","Analyse the question","Draft an outline","Find information","Write","Edit and Proofread"]}],
            required: true
    },
    milestonePhases:[{
        type: String
    }]
});


const milestone = mongoose.model('MileStone', milestoneSchema)
const test = mongoose.model('Test', testmilestoneSchema)
const project = mongoose.model('Project', projectmilestoneSchema)
const assignment = mongoose.model('Assignment', assignmentmilestoneSchema)


module.exports={
    Milestone: milestone,
    Test: test,
    Project: project,
    Assignment: assignment
}