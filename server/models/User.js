const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  image_url: String,
  votes : [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
}, { timestamps: true })

module.exports = {
  model: mongoose.model('User', userSchema),
  schema: userSchema
}
