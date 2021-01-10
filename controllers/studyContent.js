const {Content} = require('../models/studyContent');
const { successResponse, errorResponse } = require('../middleware/responseFormat');

const getAllStudyContents = (req, res) => {
    const queryParams = req.query;
    StudyContent.find(queryParams)
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const createNewStudyContent = (req, res) => {
    const newContent = new Content(req.body);
    newContent.save()
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const getContentById = (req, res) => {
    const contentId = req.params.contentId;
    Content.findById(contentId)
    .then(success => {
        res.status(200).json(successResponse("OK", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const updateStudyContent = (req, res) => {
    const updateObject = req.body;
    console.log(req.body);
    Content.findByIdAndUpdate(req.params.contentId, {$set: updateObject}, {new: true})
    .then(success => {
        res.status(200).json(successResponse("Updated Successfully", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const addChapterToSyllabus = (req, res) => {
    Content.findByIdAndUpdate(req.params.contentId, {$push: req.body}, {new: true})
    .then(success => {
        res.status(200).json(successResponse("Chapter Added Successfully", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const updateChapter = (req, res) => {
    Content.findByIdAndUpdate({"_id": req.params.contentId, "syllabus.id": req.params.chapterId}, {$set: req.body}, {new: true})
    .then(success => {
        res.status(200).json(successResponse("Chapter Updated Successfully", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

const deleteChapter = (req, res) => {
    Content.findByIdAndUpdate({"_id": req.params.contentId}, {$pop: {"syllabus.id": req.params.chapterId}})
    .then(success => {
        res.status(204).json(successResponse("Chapter Deleted Successfully", success, res.statusCode));
    })
    .catch(error => {
        res.status(400).json(errorResponse(error, res.statusCode));
    })
}

module.exports = {
    getContentById,
    getAllStudyContents,
    createNewStudyContent,
    updateStudyContent,
    addChapterToSyllabus,
    updateChapter,
    deleteChapter
}