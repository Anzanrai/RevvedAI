const {TemplateMessage} = require('../models/templateMessage');
const { successResponse, errorResponse } = require('../middleware/responseFormat');

const getTemplateMessages = (req, res) => {
    TemplateMessage.find()
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
};

const getTemplateMessageById = (req, res) => {
    TemplateMessage.findOne({id: req.params.templateMessageId})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
};

const addTemplateMessages = (req, res) => {
    const templateMessage = new TemplateMessage(req.body);
    templateMessage.save()
    .then(success => {
        res.status(201).json(successResponse("Created", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
};

const updateTemplateMessage = (req, res) => {
    const updateObject = req.body;
    TemplateMessage.findByIdAndUpdate(req.params.templateMessageId, {$set: {updateObject}})
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
};

module.exports = {
    getTemplateMessages,
    getTemplateMessageById,
    addTemplateMessages,
    updateTemplateMessage
}