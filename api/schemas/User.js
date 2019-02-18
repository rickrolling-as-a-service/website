const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: String,
  hashedPassword: String,
  key: String
})

module.exports = mongoose.model('User', schema)