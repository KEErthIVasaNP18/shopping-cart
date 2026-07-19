const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    Category: {
        type: String,
        required: true,
        unique: true
    },
    Slug: {
        type: String,
        required: true,
        unique: true
    },
    About: {
        type: String,
        required: false
    }
}
)

module.exports = mongoose.model('categories', categorySchema)