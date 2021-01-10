const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    subjectCode: {type: String, required: true, unique: true},
    subjectName: {type: String, required: true},
    grade: {type: String, required: true},
    syllabus: [
        {
            unit: {type: Number},
            unitTitle: {type: String},
            weightage: {type: Number},
            chapters: [
                {
                    chapterNumber: {type: Number},
                    chapterTitle: {type: String}
                }
            ]
            
        }
    ]
})

module.exports = {
    Content: mongoose.model("Content", subjectSchema)
}