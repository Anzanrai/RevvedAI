const mongoose = require('mongoose')

const student = new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    school: {
        schoolName: {type: String},
        schoolAddress: {
            streetName: {type: String},
            streetNumber: {type: String},
            suburb: {type: String},
            city: {type: String},
            state: {type: String},
            zipcode: {type: Number}
        }
    },
    semester:{type:String},
    email:{type:String, required:true},
    phone:{type:String, required:true},
    address:[
        {
            streetName: {type: String, required: true},
            streetNumber: {type: String, required: true},
            suburb: {type: String, required: true},
            city: {type: String, required: true},
            state: {type: String, required: true},
            zipcode: {type: Number, required: true}
        }
    ],
    guardian: [
        {
            firstName: {type: String, required: true},
            lastName: {type: String, required: true},
            userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            email: {type: String, required: true},
            phone: {type: String, required: true},
            address:[
                {
                    streetName: {type: String, required: true},
                    streetNumber: {type: String, required: true},
                    suburb: {type: String, required: true},
                    city: {type: String, required: true},
                    state: {type: String, required: true},
                    zipcode: {type: Number, required: true}
                }
            ]
        }
    ]
})






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
    Student: mongoose.model('Student', student),
    Attendance: attendanceSchema
}