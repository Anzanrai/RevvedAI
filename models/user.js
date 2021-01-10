require('dotenv').config()
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SALT = 10;
var uniqueValidator = require('mongoose-unique-validator');
const student = require('./student');

const userSchema = new mongoose.Schema({
    // username: {type: String, required: [true, "Username is required"], unique: [true, "Username already taken."], trim: true},
    username: {type: String, unique: [true, "Username already taken."], trim: true},
    // email: {type: String, required: [true, "Email is required"], unique: [true, "Account already registered with this email."], trim: true},
    email: {type: String, unique: [true, "Account already registered with this email."], trim: true},
    // password: {type: String, required: [true, "Password is required"], minlength: 8},
    password: {type: String, minlength: 8},
    userType: {type: String, required: [true, "User type is required"], enum: ["Student", "Teacher", "Guardian"], default: "Student", trim: true},
    phone: {type: String, unique:[true, "This phone number is already registered."], trim: true},
    firstName: {type: String},
    lastName: {type: String},
    address: [
        {
            streetName: {type: String, required: true},
            streetNumber: {type: String, required: true},
            suburb: {type: String, required: true},
            city: {type: String, required: true},
            state: {type: String, required: true},
            zipcode: {type: Number, required: true}
        }
    ],
    fbId: {type: String}
});

//saving user data
userSchema.pre('save', function (next) {
    var user = this;
    if (user.isModified('password')) {//checking if password field is available and modified
        bcrypt.genSalt(SALT, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash;
                next();
            });
        });
   } else {
    next();
    }
});

//for comparing the users entered password with database duing login 
userSchema.methods.comparePassword = function (candidatePassword, callBack) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return callBack(err);
    callBack(null, isMatch);
   });
}

//for generating token when loggedin
userSchema.methods.generateToken = function (callBack) {
    var user = this;
    var token = jwt.sign(user._id.toHexString(), process.env.SECRETE);
    user.token = token;
    user.save(function (err, user) {
        if (err) return callBack(err)
        callBack(null, user)
   });
};

//validating token for auth routes middleware
userSchema.statics.findByToken = function (token, callBack) {
    var user = this;
    jwt.verify(token, process.env.SECRETE, function (err, decode) {//this decode must give user_id if token is valid .ie decode=user_id
    
    console.log(decode);
    user.findById({ "_id": decode, "token": token }, function (err, user) {
        if (err) return callBack(err);
        callBack(null, user);
    });
    });
};


userSchema.plugin(uniqueValidator);

const User = mongoose.model("GenericUser", userSchema)

const guardianSchema = new mongoose.Schema({});

const Guardian = User.discriminator("Guardian", guardianSchema);

// const teacherSchema = new mongoose.Schema();

const studentSchema = new mongoose.Schema({
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
    grade: {type: Number, required: true},
    subjectsEnrolled: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Content'}
    ],
    guardian: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Guardian'}
    ]
})

// const Student = mongoose.model('Student', studentSchema);

const Student = User.discriminator('Student', studentSchema);

module.exports = {
    User,
    Student,
    Guardian
}

// 5fba337559074ed495c84341