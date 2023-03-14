const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
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