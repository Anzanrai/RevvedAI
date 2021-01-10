const {Guardian} = require("../models/user");
const { successResponse, errorResponse } = require("../middleware/responseFormat");

const registerGuardian = (req, res) => {
    let guardian = new Guardian(req.body);
    guardian.save()
    .then(success => {
        res.status(200).json(successResponse("Guardian Registered.", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getGuardianById = (req, res) => {
    Guardian.findById(req.body.guardianId)
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const updateGuardian = (req, res) => {
    Guardian.findOneAndUpdate({'_id': req.params.guardianId}, {$set: req.body}, {new: true})
    .then(success=> {
        res.status(200).json(successResponse("Update successful", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

module.exports = {
    registerGuardian,
    getGuardianById,
    updateGuardian
}