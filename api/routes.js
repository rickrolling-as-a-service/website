const uuid = require('uuid/v1')
const shortId = require('shortid')
const { hash, check } = require('./hash')
const { memes } = require('./constants')
const User = require('./schemas/User')
const Deployment = require('./schemas/Deployment')

module.exports = async (app) => {
  app.post('/api/key', async (req, res) => {
    try {
      const { username, password } = req.body
      if (!username || !password) return res.status(401).json({
        error: 'Username or password not specified'
      })

      const existingUser = await User.findOne({ username })
      if (existingUser) {
        const success = await check(password, existingUser.hashedPassword)
        if (!success) return res.status(401).json({
          error: 'Incorrect password'
        })

        return res.json({
          key: existingUser.key
        })
      }

      const key = Buffer.from(uuid()).toString('base64')
      const hashedPassword = await hash(password)
      await new User({ username, hashedPassword, key }).save()
      res.json({ key })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })
  
  app.post('/api/regen', async (req, res) => {
    try {
      const { username, password } = req.body
      if (!username || !password) return res.status(400).json({
        error: 'Username or password not specified'
      })

      const existingUser = await User.findOne({ username })
      if (existingUser) {
        const success = await check(password, existingUser.hashedPassword)
        if (!success) return res.status(401).json({
          error: 'Incorrect password'
        })
      } else {
        return res.status(401).json({
          error: 'User does not exist'
        })
      }

      const key = Buffer.from(uuid()).toString('base64')
      existingUser.key = key
      await existingUser.save()
      res.json({ key })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })

  app.post('/api/deploy', async (req, res) => {
    try {
      const { key, memeIndex } = req.body
      if (!key) return res.status(401).json({
        error: 'API key not specified'
      })

      const actualMemeIndex = memeIndex || 0
      if (!(actualMemeIndex in memes)) return res.status(404).json({
        error: 'Meme not found'
      })

      const existingUser = await User.findOne({ key })
      if (!existingUser) return res.status(401).json({
        error: 'Invalid API key'
      })

      const code = shortId.generate()
      await new Deployment({
        username: existingUser.username,
        views: 0,
        memeIndex: actualMemeIndex,
        code
      }).save()
      res.json({
        code,
        uri: `https://raas.pw/r/${code}`
      })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })
}