const Teacher = require("../models/teacher");

const getTeachers = (req, res) => {
    Teacher.find()
    .then(success => {
        res.status(200).json(success)
    })
    .catch(error => {
        res.status(404).json(error)
    })
}

const getTeacherByID = (req, res) => {
    Teacher.findById({"_id": req.params.id})
    .then(success => {
        res.status(200).json(success)
    })
    .catch(error => {
        res.status(404).json(error)
    })
}

const createTeacherProfile = (req, res) => {
    const teacher = new Teacher(req.body);
    teacher.save(req.body)
    .then(success => {
        res.status(201).json(success)
    })
    .catch(error=> {
        res.status(400).json(error)
    })
}

const updateTeacherProfile = (req, res) => {
    let teacher = Teacher.findById(req.params.id)
    teacher.firstName = req.body.firstName
    teacher.lastName = req.body.lastName
    teacher.userID = req.body.userID
    teacher.email = req.body.email
    teacher.address = req.body.address
    teacher.save()
    .then(success=> {
        res.status(200).json(success)
    })
    .catch(error=> {
        res.status(400).json({error})
    })
}

module.exports = {
    getTeachers,
    getTeacherByID,
    createTeacherProfile,
    updateTeacherProfile
}