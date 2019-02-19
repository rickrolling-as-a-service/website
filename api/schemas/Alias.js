const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  code: String,
  alias: String,
  username: String
})

module.exports = mongoose.model('Alias', schema)