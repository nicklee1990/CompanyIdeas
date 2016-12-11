const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  text: String
  // author: { type: Number, ref: 'User' }
}, { timestamps: true })

module.exports = {
  model: mongoose.model('Comment', commentSchema),
  schema: commentSchema
}
