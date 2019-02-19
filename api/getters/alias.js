require('../mongoose')
const Alias = require('../schemas/Alias')
const Deployment = require('../schemas/Deployment')
const { memes } = require('../constants')
const { parse } = require('url')

module.exports = async (req, res) => {
  try {
    const { alias } = parse(req.url, true).query
    if (!alias) {
      res.statusCode = 400
      res.setHeader('Content-Type', 'text/plain')
      return res.end('No alias specified')
    }

    const existingAlias = await Alias.findOne({ alias })
    if (!existingAlias) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      return res.end('Alias not found')
    }
    const { code } = existingAlias

    const deployment = await Deployment.findOne({ code })
    if (!deployment) {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/plain')
      return res.end('Deployment not found')
    }

    deployment.views++
    await deployment.save()

    res.statusCode = 301
    res.setHeader('Location', memes[deployment.memeIndex].uri)
    res.end()
  } catch(error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    return res.end('We messed up')
  }
}