const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  name: String,
  image_url: String,
  votes : [{ type: Schema.Types.ObjectId, ref: 'Vote' }]
}, { timestamps: true })

userSchema.plugin(passportLocalMongoose)

module.exports = {
  model: mongoose.model('User', userSchema),
  schema: userSchema
}
