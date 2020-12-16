const {Student} = require('../models/student');
const { options } = require('../routes/user');
const { successResponse } = require('../middleware/responseFormat');

const createStudentProfile = (req, res) => {
    const student = new Student(req.body)
    student.save()
    .then(success => {
        generateOTP(req.body.phone)
        res.status(201).json(successResponse("Student profile created successfully.", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse("Not able to save student profile.", res.statusCode));
    })
}

const getStudentByUserID = (req, res) => {
    console.log(req.params.userID);
    Student.findOne({"userID": req.params.userID})
    .then(success => {
        console.log(success);
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(404).json(errorResponse("Student profile not found", res.statusCode));
    })
}

module.exports = ({
    createStudentProfile,
    getStudentByUserID
})