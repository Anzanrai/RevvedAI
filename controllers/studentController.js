const {Student} = require('../models/student');
const { options } = require('../routes/user');

const createStudentProfile = (req, res) => {
    const student = new Student(req.body)
    student.save()
    .then(success => {
        generateOTP(req.body.phone)
        res.status(201).json(success)
    })
    .catch(error => {
        res.status(400).json(error)
    })
}

module.exports = ({
    createStudentProfile
})