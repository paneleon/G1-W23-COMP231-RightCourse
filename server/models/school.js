const mongoose = require('mongoose')

const schoolSchema = new mongoose.Schema({
    schoolName: {
        type: String,
        required: true
    },
    schoolType: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
})

module.exports = mongoose.model('School', schoolSchema)