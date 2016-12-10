const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  text: String
  //author: { type: Number, ref: 'User' }
}, { timestamps: true })

module.exports = {
  model: mongoose.model('Comment', commentSchema),
  schema: commentSchema
}
