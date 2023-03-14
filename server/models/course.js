const mongoose = require('mongoose')
const School = require('./school')
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        ref: School
    },
    courseName: {
        type: String,
        required: true
    },
    courseCode: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
})

module.exports = mongoose.model('course', courseSchema)