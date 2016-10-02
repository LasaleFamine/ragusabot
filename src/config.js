'use strict'

require('dotenv').config()
const builder = require('botbuilder')
const restify = require('restify')

//  =========================================================
//  Bot Setup
//  =========================================================

//  Setup Restify Server
const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 8080, () => {
  console.log(`${server.name} listening to ${server.url}`)
})

const connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
})

// const connector = new builder.ConsoleConnector().listen()

const bot = new builder.UniversalBot(connector)

server.post('/api/messages', connector.listen())

module.exports = {builder, bot}
