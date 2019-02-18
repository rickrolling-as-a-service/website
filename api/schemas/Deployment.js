const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  code: String,
  username: String,
  views: Number,
  memeIndex: Number
})

module.exports = mongoose.model('Deployment', schema)