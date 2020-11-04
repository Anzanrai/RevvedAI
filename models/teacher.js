const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: {type:String, required:true},
    address:[
        {type:{
            streetName: {type: String, required: true},
            streetNumber: {type: String, required: true},
            suburb: {type: String, required: true},
            city: {type: String, required: true},
            state: {type: String, required: true},
            zipcode: {type: Number, required: true}
        }}
    ]
})

module.exports = mongoose.model("Teacher", teacherSchema);