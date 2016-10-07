'use strict'

const feed = require('feed-read')
const strip = require('striptags')
const google = require('googleapis')

const {
  Feed
} = require('./models.js')

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

const _stripArticlesContent = articles => {
  return articles.map(article => {
    article.content = strip(article.content)
    return article
  })
}
const _getFeeds = (url, limit, cb) => {
  feed(url, (err, articles) => {
    if (err) {
      return cb(err)
    }
    const stripedArticles = _stripArticlesContent(articles.slice(0, limit))
    const feeds = stripedArticles.reduce((acc, article) => {
      return acc.concat(new Feed(article))
    }, [])
    cb(feeds)
  })
}
const _shortUrl = url => {
  const urlshortener = google.urlshortener('v1')
  const params = {
    resource: {
      longUrl: url
    },
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
}
const _computeMessage = (feed, shortLink) => {
  return `
${feed.title}
${shortLink}
    `
}

const utils = {
  getMessagesFromFeed: (urls, limit) => {
    return new Promise(resolve => {
      let msgs = []
      urls.map(url => {
        return _getFeeds(url, limit, feeds => {
          return feeds.map(feed => {
            return _shortUrl(feed.link)
              .then(shortLink => {
                const msg = _computeMessage(feed, shortLink)
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
    })
  },
  getUrls: category => {
    return links[category] ? links[category] : []
  }
}

module.exports = {
  messages,
  utils
}
