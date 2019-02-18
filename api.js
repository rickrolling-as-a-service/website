const app = require('./api/express')
require('./api/mongoose')
require('./api/routes')(app)
app.listen(3000, () => console.log('> Listening on port 3000'))