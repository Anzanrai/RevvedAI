const mongoose = require('mongoose')
const extendSchema = require('mongoose-extend-schema')


const milestoneSchema= new mongoose.Schema({
    milestoneName:{type: String, required: true},
    milestoneIsCompleted:{type: Boolean, default: false},
    milestoneDueDate:{type:Date}
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
    projectmilestoneSchema:{
        type:[{type: String, 
            enum:["Deciding on a project","Planning out for the project","Researching the project","Creating your project"]}],
            required: true
    },
    milestonePhases:[{
        type: String
    }]
});


const assignmentmilestoneSchema = extendSchema(milestoneSchema,{
    assignmentmilestoneSchema:{
        type:[{type: String, 
            enum:["Plan","Analyse the question","Draft an outline","Find information","Write","Edit and Proofread"]}],
            required: true
    },
    milestonePhases:[{
        type: String
    }]
});


const milestone = mongoose.model('MileStone', milestoneSchema)
// const test = mongoose.model('Test', testmilestoneSchema)
const project = mongoose.model('Project', projectmilestoneSchema)
const assignment = mongoose.model('Assignment', assignmentmilestoneSchema)


module.exports={
    Milestone: milestone,
    Test: mongoose.model('Test', testmilestoneSchema),
    Project: project,
    Assignment: assignment
}