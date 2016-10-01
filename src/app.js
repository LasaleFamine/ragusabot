const {
  builder,
  bot
} = require('./config.js')

// const {user} = require('./models.js')
const {messages} = require('./utils.js')

//  =========================================================
//  Bots Dialogs
//  =========================================================

const intents = new builder.IntentDialog()
bot.dialog('/', intents)

/**
  * On default intent
  */
intents.onDefault([
  (session, args, next) => {
    if (session.userData.firstResponse) {
      next()
    } else {
      session.beginDialog('/returnUser')
    }
  },
  session => {
    session.send(messages.default(session.userData.firstResponse))
  }
])

// --- Dialogs --- //
bot.dialog('/returnUser', [
  session => {
    builder.Prompts.text(session, 'Ciao! Come ti chiami?')
  },
  (session, results) => {
    session.userData.firstResponse = results.response
    session.endDialog()
  }
])
