'use strict'

const builder = require('botbuilder')
const fastify = require('fastify')()

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

// For testing with the console
// const connector = new builder.ConsoleConnector().listen()
const bot = new builder.UniversalBot(connector)

//  Setup fastify Server
fastify.listen(process.env.port || process.env.PORT || 8080, () => {
  console.log(`${fastify.server.address().host} listening to ${fastify.server.address().port}`)
  console.log('MS', process.env.MICROSOFT_APP_ID)
  console.log('GO', process.env.GOOGLE_SHORTNER_KEY)
})

fastify.post('/bot/api/messages', connector.listen)

module.exports = {builder, bot}
