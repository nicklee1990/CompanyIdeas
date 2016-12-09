const mongoose = require('mongoose')
const Comment = require('./Comment').schema

const ideaSchema = new mongoose.Schema({
  name: String,
  description: String,
  image_url: String,
  comments: [Comment],
  author: String,
  votes : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vote' }]
}, { timestamps: true })

module.exports = {
  model: mongoose.model('Idea', ideaSchema),
  schema: ideaSchema
}
