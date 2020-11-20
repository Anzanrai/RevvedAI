const {Milestone} = require('../models/milestone');
const {Test} = require('../models/milestone');
const {Project} = require('../models/milestone');
const {Assignment} = require('../models/milestone');


//TEST
const getTest = (req, res) => {
    Test.find()
    .then(success => {
        res.json(success)
    })
    .catch(error=> {
        res.status(400).send("Bad request, users not found.")
    })
}


const getTestById = (req, res) => {
    Test.findById(req.params.id)
    .then(success=> {
        res.json(success)
    })
    .catch(error=> {
        res.status(404).send("User not found")
    })
}

const registerTest = (req, res) => {
    let test  = new Test({
        milestonetype: req.body.milestonetype,
        milestoneIsCompleted: req.body.milestoneIsCompleted,
        milestoneDueDate: req.body.milestoneDueDate,
        milestoneName:req.body.milestoneName,
        milestonePhases: req.body.milestonePhases
    })
    test.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}


const updateTest = (req, res) => {
    let test  = new Test.findById(req.params.id)
    test.milestonetype= req.body.milestonetype
    test.milestoneIsCompleted= req.body.milestoneIsCompleted
    test.milestoneDueDate= req.body.milestoneDueDate
    test.milestoneName=req.body.milestoneName
    test.milestonePhases= req.body.milestonePhases
    test.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}

//PROJECT

const getProject = (req, res) => {
    Project.find()
    .then(success => {
        res.json(success)
    })
    .catch(error=> {
        res.status(400).send("Bad request, users not found.")
    })
}



const getProjectById = (req, res) => {
    Project.findById(req.params.id)
    .then(success=> {
        res.json(success)
    })
    .catch(error=> {
        res.status(404).send("User not found")
    })
}


const registerProject = (req, res) => {
    let project  = new Project({
        milestonetype: req.body.milestonetype,
        milestoneIsCompleted: req.body.milestoneIsCompleted,
        milestoneDueDate: req.body.milestoneDueDate,
        milestoneName:req.body.milestoneName,
        milestonePhases: req.body.milestonePhases
    })
    test.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}


const updateProject = (req, res) => {
    let project  = new Project.findById(req.params.id)
    test.milestonetype= req.body.milestonetype
    test.milestoneIsCompleted= req.body.milestoneIsCompleted
    test.milestoneDueDate= req.body.milestoneDueDate
    test.milestoneName=req.body.milestoneName
    test.milestonePhases= req.body.milestonePhases
    test.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}


//ASSIGNMENT

const getAssignment = (req, res) => {
    Assignment.find()
    .then(success => {
        res.json(success)
    })
    .catch(error=> {
        res.status(400).send("Bad request, users not found.")
    })
}


const getAssignmentById = (req, res) => {
    Assignment.findById(req.params.id)
    .then(success=> {
        res.json(success)
    })
    .catch(error=> {
        res.status(404).send("User not found")
    })
}

const registerAssignment = (req, res) => {
    let assignment  = new Assignment({
        milestonetype: req.body.milestonetype,
        milestoneIsCompleted: req.body.milestoneIsCompleted,
        milestoneDueDate: req.body.milestoneDueDate,
        milestoneName:req.body.milestoneName,
        milestonePhases: req.body.milestonePhases
    })
    test.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}


const updateAssignment = (req, res) => {
    let assignment  = new Assignment.findById(req.params.id)
    test.milestonetype= req.body.milestonetype
    test.milestoneIsCompleted= req.body.milestoneIsCompleted
    test.milestoneDueDate= req.body.milestoneDueDate
    test.milestoneName=req.body.milestoneName
    test.milestonePhases= req.body.milestonePhases
    test.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}


module.exports = {
    getTest,
    getProject,
    getAssignment,
    getTestById,
    getProjectById,
    getAssignmentById,
    registerTest,
    registerProject,
    registerAssignment,
    updateTest,
    updateProject,
    updateAssignment
}