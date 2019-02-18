const bcrypt = require('bcrypt-nodejs')

module.exports.hash = (string) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(string, null, null, (error, hash) => {
      if (error) {
        reject(error)
      } else {
        resolve(hash)
      }
    })
  })
}

module.exports.check = (string, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(string, hash, (error, success) => {
      if (error) {
        reject(error)
      } else {
        resolve(success)
      }
    })
  })
}