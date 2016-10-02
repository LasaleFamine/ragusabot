'use strict'

const feed = require('feed-read')
const strip = require('striptags')

const {Feed} = require('./models.js')

const links = require('./data/links.json')

const messages = {
  default: () => {
    return `
Posso fornirti le ultimissime notizie sulla provincia di Ragusa.
Puoi chiedermi di cronaca, cultura, sport, attualità e politica.
Scrivi "cam" per l'immagine live della cam di Marina di Ragusa.
"Vuoi darmi un suggerimento? Scrivi "Consiglio:" seguito dal tuo messaggio!"
    `
  }
}

const utils = {
  getUrls: category => {
    return links[category]
  },
  getSingleFeedFromUrl: (url, cb) => {
    feed(url, (err, articles) => {
      if (err) {
        return cb(err)
      }
      const article = articles[0]
      article.content = strip(article.content)
      cb(new Feed(article))
    })
  }
}

module.exports = {messages, utils}
