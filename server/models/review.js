const mongoose = require('mongoose')
const Course = require('./course')

const reviewSchema = new mongoose.Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: Course
    },
    /* 
    userId: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    */
    professorName: {
        type: String
    },
    mainTopics: {
        type: String
    },
    comments: {
        type: String
    },
    effectiveness: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Review', reviewSchema)