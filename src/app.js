const {builder, bot} = require('./config.js')

// const {user} = require('./models.js')
const {messages, utils} = require('./utils.js')

//  =========================================================
//  Bots Dialogs
//  =========================================================

const intents = new builder.IntentDialog()
bot.dialog('/', intents)

// === INTENTS

intents.matches(/cronaca/i, [
  session => {
    session.beginDialog('/news', 'cronaca')
  },
  (session, results) => {
    session.send(results.response[0])
    session.send(results.response[1])
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
    const urls = utils.getUrls(category)
    const promise = new Promise(resolve => {
      let cards = []
      urls.map(url => {
        return utils.getSingleFeedFromUrl(url, feed => {
          const msg = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
              new builder.ThumbnailCard(session)
                .title(feed.title)
                .text(feed.content)
                .tap(builder.CardAction.openUrl(session, feed.link))
            ])
          cards = cards.concat(msg)
          if (cards.length === urls.length) {
            return resolve(cards)
          }
        })
      })
    })
    promise.then(cards => {
      session.dialogData.cards = cards
      session.endDialogWithResult({
        response: session.dialogData.cards
      })
    })
  }
])
