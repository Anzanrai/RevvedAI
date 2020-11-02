const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    semester:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:[
        {type:{
            addressStreet: {type: String, required: true},
            addressState: {type: String, required: true},
            addressZipCode: {type: Number, required: true}
        }}
    ]
})

const studentSchema = mongoose.model('Student', studentSchema)

const attendanceSchema = new mongoose.Schema({
    studentID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student',
        required: true
    },
    attendanceDate: {
        type: Date,
        required: true
    }
})

const attendanceSchema = mongoose.model('Attendance', attendanceSchema)

module.exports = {
    studentSchema: studentSchema,
    attendanceSchema: attendanceSchema
}