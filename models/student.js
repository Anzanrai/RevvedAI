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
    groupID:{
        type:String
    },
    attendanceID:{
        type:String
        
    },
    password:{
        type:String,
        required:true
    },
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
    address:{
        type:String,
        required:true
    }

})

module.exports = mongoose.model('Student',studentSchema)