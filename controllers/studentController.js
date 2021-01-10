const {Student, User} = require('../models/user');
const { options } = require('../routes/user');
const { successResponse, errorResponse } = require('../middleware/responseFormat');


const registerStudent = (req, res) => {
    let student = new Student(req.body)
    student.save()
    .then(success => {
        res.status(200).json(successResponse("Student Registered", success, res.statusCode))
    })
    .catch(error =>{
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getStudentById = (req, res) => {
    console.log("At student controller, getStudentById", req.params.id);
    Student.findById(req.params.id, {$lookup: {
        from: "contents",
        localField: "subjectsEnrolled",
        foreignField: "_id",
        as: "subjects"
    }})
    .then(success => {
        console.log(success);
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        console.log(error);
        res.status(404).json(errorResponse("Student profile not found", res.statusCode));
    })
}

const updateStudent = (req, res) => {
    let updateParams = req.body;
    console.log(updateParams);
    Student.findOneAndUpdate({"_id": req.params.studentId}, {$set: updateParams}, {new: true})
    .then(success => {
        res.status(200).json(successResponse("Student Updated Successfully", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getStudents = (req, res) => {
    Student.find()
    .then( success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch( error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

// const createStudentProfile = (req, res) => {
//     const student = new Student(req.body)
//     student.save()
//     .then(success => {
//         generateOTP(req.body.phone)
//         res.status(201).json(successResponse("Student profile created successfully.", success, res.statusCode));
//     })
//     .catch(error => {
//         res.status(400).json(errorResponse("Not able to save student profile.", res.statusCode));
//     })
// }

// const getStudentByUserID = (req, res) => {
//     console.log(req.params.userID);
//     Student.findOne({"userID": req.params.userID})
//     .then(success => {
//         console.log(success);
//         res.status(200).json(successResponse("OK", success, res.statusCode));
//     })
//     .catch(error => {
//         res.status(404).json(errorResponse("Student profile not found", res.statusCode));
//     })
// }

module.exports = ({
    registerStudent,
    getStudentById,
    updateStudent,
    getStudents
})