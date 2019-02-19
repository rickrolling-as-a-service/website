const uuid = require('uuid/v1')
const shortId = require('shortid')
const { hash, check } = require('./hash')
const { memes } = require('./constants')
const User = require('./schemas/User')
const Deployment = require('./schemas/Deployment')
const Alias = require('./schemas/Alias')

module.exports = async (app) => {
  app.post('/api/key/get', async (req, res) => {
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
  
  app.post('/api/key/regen', async (req, res) => {
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

  app.post('/api/deployments/create', async (req, res) => {
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

  app.post('/api/deployments/info', async (req, res) => {
    try {
      const { key, code } = req.body
      if (!key) return res.status(401).json({
        error: 'API key not specified'
      })
      if (!code) return res.status(400).json({
        error: 'Code not specified'
      })

      const existingUser = await User.findOne({ key })
      if (!existingUser) return res.status(401).json({
        error: 'Invalid API key'
      })

      const deployment = await Deployment.findOne({ code })
      if (!deployment) return res.status(404).json({
        error: 'Deployment not found'
      })
      if (deployment.username !== existingUser.username) {
        return res.status(403).json({
          error: 'You are not the owner of that deployment'
        })
      }

      res.json({
        memeIndex: deployment.memeIndex,
        memeUri: memes[deployment.memeIndex].uri,
        memeName: memes[deployment.memeIndex].name,
        views: deployment.views,
        uri: deployment.uri
      })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })

  app.post('/api/deployments/list', async (req, res) => {
    try {
      const { key, memeIndex } = req.body
      if (!key) return res.status(401).json({
        error: 'API key not specified'
      })

      const existingUser = await User.findOne({ key })
      if (!existingUser) return res.status(401).json({
        error: 'Invalid API key'
      })

      const query = {
        username: existingUser.username
      }
      if (memeIndex !== undefined) {
        if (!(memeIndex in memes)) return res.status(404).json({
          error: 'Meme not found'
        })
        query.memeIndex = memeIndex
      }

      const deployments = await Deployment.find(query, 'code memeIndex views -_id')
      res.json({
        count: deployments.length,
        deployments
      })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })

  app.post('/api/deployments/view', async (req, res) => {
    try {
      const { key, code } = req.body
      if (!key) return res.status(401).json({
        error: 'API key not specified'
      })
      if (!code) return res.status(400).json({
        error: 'Code not specified'
      })

      const existingUser = await User.findOne({ key })
      if (!existingUser) return res.status(401).json({
        error: 'Invalid API key'
      })

      const deployment = await Deployment.findOne({ code })
      if (!deployment) return res.status(404).json({
        error: 'Deployment not found'
      })
      if (deployment.username !== existingUser.username) {
        return res.status(403).json({
          error: 'You are not the owner of that deployment'
        })
      }

      deployment.views++
      await deployment.save()
      res.json({
        views: deployment.views
      })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })

  app.delete('/api/deployments/delete', async (req, res) => {
    try {
      const { key, code } = req.body
      if (!key) return res.status(401).json({
        error: 'API key not specified'
      })
      if (!code) return res.status(400).json({
        error: 'Code not specified'
      })

      const existingUser = await User.findOne({ key })
      if (!existingUser) return res.status(401).json({
        error: 'Invalid API key'
      })

      const deployment = await Deployment.findOne({ code })
      if (!deployment) return res.status(404).json({
        error: 'Deployment not found'
      })
      if (deployment.username !== existingUser.username) {
        return res.status(403).json({
          error: 'You are not the owner of that deployment'
        })
      }

      await deployment.remove()
      res.json({
        finalViews: deployment.views
      })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })

  app.post('/api/aliases/alias', async (req, res) => {
    try {
      const { key, code, alias } = req.body
      if (!key) return res.status(401).json({
        error: 'API key not specified'
      })
      if (!alias || !code) return res.status(400).json({
        error: 'Alias or code not specified'
      })

      const aliasRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
      if (!alias.match(aliasRegex)) {
        return res.status(400).json({
          error: `Invalid alias, must match regex ${aliasRegex.toString()}`
        })
      }

      const existingUser = await User.findOne({ key })
      if (!existingUser) return res.status(401).json({
        error: 'Invalid API key'
      })

      const deployment = await Deployment.findOne({ code })
      if (!deployment) return res.status(404).json({
        error: 'Deployment not found'
      })
      if (deployment.username !== existingUser.username) {
        return res.status(403).json({
          error: 'You are not the owner of that deployment'
        })
      }

      const existingAlias = await Alias.findOne({ alias })
      if (existingAlias) {
        if (existingAlias.username !== existingUser.username) {
          return res.status(403).json({
            error: 'You are not the owner of that alias'
          })
        }
        existingAlias.code = code
        await existingAlias.save()
        return res.json({
          aliasUri: `https://raas.pw/a/${existingAlias.alias}`,
          alias: existingAlias.alias
        })
      } else {
        await new Alias({
          username: existingUser.username,
          code,
          alias
        }).save()
        return res.json({
          aliasUri: `https://raas.pw/a/${alias}`,
          alias
        })
      }
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })

  app.post('/api/aliases/info', async (req, res) => {
    try {
      const { key, alias } = req.body
      if (!key) return res.status(401).json({
        error: 'API key not specified'
      })
      if (!alias) return res.status(400).json({
        error: 'Alias not specified'
      })

      const aliasRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
      if (!alias.match(aliasRegex)) {
        return res.status(400).json({
          error: `Invalid alias, must match regex ${aliasRegex.toString()}`
        })
      }

      const existingUser = await User.findOne({ key })
      if (!existingUser) return res.status(401).json({
        error: 'Invalid API key'
      })

      const existingAlias = await Alias.findOne({ alias })
      if (!existingAlias) return res.status(404).json({
        error: 'Alias not found'
      })
      if (existingAlias.username !== existingUser.username) {
        return res.status(403).json({
          error: 'You are not the owner of that alias'
        })
      }

      res.json({
        code: existingAlias.code,
        aliasUri: `https://raas.pw/a/${alias}`
      })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })

  app.delete('/api/aliases/delete', async (req, res) => {
    try {
      const { key, alias } = req.body
      if (!key) return res.status(401).json({
        error: 'API key not specified'
      })
      if (!alias) return res.status(400).json({
        error: 'Alias not specified'
      })

      const aliasRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
      if (!alias.match(aliasRegex)) {
        return res.status(400).json({
          error: `Invalid alias, must match regex ${aliasRegex.toString()}`
        })
      }

      const existingUser = await User.findOne({ key })
      if (!existingUser) return res.status(401).json({
        error: 'Invalid API key'
      })

      const existingAlias = await Alias.findOne({ alias })
      if (!existingAlias) return res.status(404).json({
        error: 'Alias not found'
      })
      if (existingAlias.username !== existingUser.username) {
        return res.status(403).json({
          error: 'You are not the owner of that alias'
        })
      }

      await existingAlias.remove()
      res.json({
        code: existingAlias.code
      })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })

  app.post('/api/aliases/list', async (req, res) => {
    try {
      const { key, code } = req.body
      if (!key) return res.status(401).json({
        error: 'API key not specified'
      })

      const existingUser = await User.findOne({ key })
      if (!existingUser) return res.status(401).json({
        error: 'Invalid API key'
      })

      const query = {
        username: existingUser.username
      }
      if (code) query.code = code

      const aliases = await Alias.find(query, 'alias code -_id')
      res.json({
        count: aliases.length,
        aliases
      })
    } catch(error) {
      res.status(500).json({
        error: 'We messed up'
      })
    }
  })
}