const
  mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  Comment = require('./Comment').schema

const ideaSchema = new Schema({
  name: String,
  description: String,
  comments: [Comment],
  author: String,
  votes : [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
}, { timestamps: true })

module.exports = {
  model: mongoose.model('Idea', ideaSchema),
  schema: ideaSchema
}
