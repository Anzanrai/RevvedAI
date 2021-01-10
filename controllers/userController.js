const {User} = require('../models/user');
const {successResponse, errorResponse} = require('../middleware/responseFormat');
const { Teacher, Guardian } = require('../models/user');
// const { json } = require('body-parser');

// to list out users
const getUsers = (req, res) => {
    User.find()
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode))
    })
    .catch(error => {
        res.status(400).json(errorResponse("Bad request, users not found.", res.statusCode))
    })
}

// for retrieving user with a particular id
const getUserById = (req, res) => {
    User.findById(req.params.id)
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode))
    })
    .catch(error => {
        res.status(404).json(errorResponse("User associated with the id not found.", res.statusCode))
    })
}

// create a new user or register a new user
// const registerUser = (req, res) => {
//     let user = new User(req.body)
//     user.save()
//     .then(success=> {
//         res.status(200).json(success)
//     })
//     .catch(error=> {
//         res.status(400).json({error})
//     })
// }

const registerTeacher = (req, res) => {
    let teacher = new Teacher(req.body)
    teacher.save()
    .then(success => {
        res.status(200).json(successResponse("Teacher Registered", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const registerGuardian = (req, res) => {
    let guardian = new Guardian(req.body)
    guardian.save()
    .then(success => {
        res.status(200).json(successResponse("Guardian Registered", success, res.statusCode));
    })
    .catch(error=> {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

module.exports = {
    getUsers,
    getUserById,
    // registerStudent,
    // updateStudent,
    registerTeacher,
    registerGuardian
}