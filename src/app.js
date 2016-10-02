const {builder, bot} = require('./config.js')

// const {user} = require('./models.js')
const {messages, utils} = require('./utils.js')

//  =========================================================
//  Bots Dialogs
//  =========================================================

const intents = new builder.IntentDialog()
bot.dialog('/', intents)

// === INTENTS

const handleResFeed = (session, results) => {
  results.response.forEach(res => {
    session.send(res)
  })
}

intents.matches(/cronaca/i, [
  session => {
    session.beginDialog('/news', 'cronaca')
  },
  handleResFeed
])

intents.matches(/cultura/i, [
  session => {
    session.beginDialog('/news', 'cultura')
  },
  handleResFeed
])

intents.matches(/attualità/i, [
  session => {
    session.beginDialog('/news', 'attualita')
  },
  handleResFeed
])

intents.matches(/sport/i, [
  session => {
    session.beginDialog('/news', 'sport')
  },
  handleResFeed
])

intents.matches(/^rick/i, [
  session => {
    session.send('https://goo.gl/SstJsZ')
  }
])

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
    session.send(messages.default())
  }
])

// --- Dialogs --- //
bot.dialog('/returnUser', [
  session => {
    builder.Prompts.text(session, 'Ciao! Piacere, sono Ragusa Bot.')
  },
  (session, results) => {
    session.userData.firstResponse = results.response
    session.endDialog()
  }
])

bot.dialog('/news', [
  (session, category) => {
    session.sendTyping()
    const urls = utils.getUrls(category)
    const promise = new Promise(resolve => {
      let msgs = []
      urls.map(url => {
        return utils.getSingleFeedFromUrl(url, feed => {
          return utils.shortUrl(feed.link)
            .then(shortLink => {
              const msg = `${shortLink}`
              msgs = msgs.concat(msg)
              if (msgs.length === urls.length) {
                return resolve(msgs)
              }
            })
            .catch(err => {
              console.log(err)
            })
        })
      })
    })
    promise.then(msgs => {
      session.dialogData.msgs = msgs
      session.endDialogWithResult({
        response: session.dialogData.msgs
      })
    })
  }
])
