// const mongoose = require('mongoose')
// const {User} = require('./user');

// // const studentSchema = new mongoose.Schema({
// //     school: {
// //         schoolName: {type: String},
// //         schoolAddress: {
// //             streetName: {type: String},
// //             streetNumber: {type: String},
// //             suburb: {type: String},
// //             city: {type: String},
// //             state: {type: String},
// //             zipcode: {type: Number}
// //         }
// //     },
// //     guardian: [
// //         {type: mongoose.Schema.Types.ObjectId, ref: 'Guardian'}
// //     ]
// // })

// // const Student = mongoose.model('Student', studentSchema);

// const Student = User.discriminator('Student', new mongoose.Schema({
//     school: {
//         schoolName: {type: String},
//         schoolAddress: {
//             streetName: {type: String},
//             streetNumber: {type: String},
//             suburb: {type: String},
//             city: {type: String},
//             state: {type: String},
//             zipcode: {type: Number}
//         }
//     },
//     guardian: [
//         {type: mongoose.Schema.Types.ObjectId, ref: 'Guardian'}
//     ]
// }));

// module.exports = mongoose.model('Student');


// // const attendance = new mongoose.Schema({
// //     studentID: {
// //         type: mongoose.Schema.Types.ObjectId, ref: 'Student',
// //         required: true
// //     },
// //     attendanceDate: {
// //         type: Date,
// //         required: true
// //     }
// // })

// // const attendanceSchema = mongoose.model('Attendance', attendance)

// // module.exports = {
// //     Student
// // }