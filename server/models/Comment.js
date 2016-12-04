const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: String,
  author: String
}, { timestamps: true })

module.exports = {
  model: mongoose.model('Comment', commentSchema),
  schema: commentSchema
}
