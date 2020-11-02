const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    userID: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    email: {type:String, required:true},
    address:[
        {type:{
            addressStreet: {type: String, required: true},
            addressState: {type: String, required: true},
            addressZipCode: {type: Number, required: true}
        }}
    ]
})

module.exports = mongoose.model("Teacher", teacherSchema);