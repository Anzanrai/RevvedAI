const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    grade: {type: String, required: true},
    subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
})

// const level = mongoose.model('Class', classSchema);

module.exports = {
    Class: mongoose.model('Class', classSchema)
}
