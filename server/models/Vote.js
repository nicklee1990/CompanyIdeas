const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
  count: Number,
  idea: { type: Number, ref: 'Idea' },
  user: { type: Number, ref: 'User' }
}, { timestamps: true })

module.exports = {
  model: mongoose.model('Vote', voteSchema),
  schema: voteSchema
}
