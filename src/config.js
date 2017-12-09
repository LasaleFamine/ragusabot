'use strict'

const builder = require('botbuilder')
const restify = require('restify')

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

// For testing with the console
// const connector = new builder.ConsoleConnector().listen()
const bot = new builder.UniversalBot(connector)

//  Setup Restify Server
const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 8080, () => {
  console.log(`${server.name} listening to ${server.url}`)
  console.log('MS', process.env.MICROSOFT_APP_ID)
  console.log('GO', process.env.GOOGLE_SHORTNER_KEY)
})

server.post('/bot/api/messages', connector.listen())

module.exports = {builder, bot}
