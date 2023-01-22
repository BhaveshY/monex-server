const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    category: { type: String, required: true },
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
    views: { type: Number, },
    comments: { type: Number, },
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog