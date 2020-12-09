const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher'},
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student'
        }
    ]
})

const level = mongoose.model('Class', classSchema);

module.exports = {
    level
}