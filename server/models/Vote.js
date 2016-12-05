const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
  count: Number,
  ideaId: mongoose.Schema.ObjectId,
  userId: mongoose.Schema.ObjectId
}, { timestamps: true })

module.exports = {
  model: mongoose.model('Vote', voteSchema),
  schema: voteSchema
}
