const mongoose = require('mongoose')

module.exports = mongoose.model('Idea', {
  name: String,
  description: String,
  image_url: String,
  author: String
})
