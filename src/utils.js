'use strict'

const feed = require('feed-read')
const strip = require('striptags')
const google = require('googleapis')

const {Feed} = require('./models.js')

const links = require('./data/links.json')

const messages = {
  default: () => {
    return `
Posso fornirti le ultimissime notizie sulla provincia di Ragusa.
Puoi chiedermi di cronaca, cultura, sport, attualità e politica.
Scrivi "cam" per l'immagine live della cam di Marina di Ragusa.
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
  },
  shortUrl: url => {
    const urlshortener = google.urlshortener('v1')
    const params = {
      resource: {longUrl: url},
      key: process.env.GOOGLE_SHORTNER_KEY
    }
    return new Promise((resolve, reject) => {
      urlshortener.url.insert(params, (err, response) => {
        if (err) {
          console.log('Encountered error', err)
          reject(err)
        } else {
          console.log('Short url is', response.id)
          resolve(response.id)
        }
      })
    })
  },
  computeMessage: (feed, shortLink, source) => {
    let msg = `${shortLink}`
    if (source === 'facebook') {
      msg =
`
${feed.title}
${shortLink}
`
    }
    return msg
  }
}

module.exports = {messages, utils}
