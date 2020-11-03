const mongoose = require('mongoose')

const student = new mongoose.Schema({
    firstName:{ type:String, required:true},
    lastName:{type:String, required:true},
    password:{type:String,required:true},
    username:{
        type:String,
        required:true
    },
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
        {
            addressStreet: {type: String, required: true},
            addressState: {type: String, required: true},
            addressZipCode: {type: Number, required: true}
        }
    ]
})

const studentSchema = mongoose.model('Student', student)

const attendance = new mongoose.Schema({
    studentID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Student',
        required: true
    },
    attendanceDate: {
        type: Date,
        required: true
    }
})

const attendanceSchema = mongoose.model('Attendance', attendance)

module.exports = {
    studentSchema: studentSchema,
    attendanceSchema: attendanceSchema
}