const mongoose = require('mongoose')
const Comment = require('./Comment').schema

const ideaSchema = new mongoose.Schema({
  name: String,
  description: String,
  image_url: String,
  comments: [Comment],
  author: String
}, { timestamps: true })

module.exports = {
  model: mongoose.model('Idea', ideaSchema),
  schema: ideaSchema
}
