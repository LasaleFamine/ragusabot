'use strict'

class Feed {
  constructor(opts) {
    opts = opts ? opts : {}
    this.title = opts.title || ''
    this.link = opts.link || ''
    this.content = opts.content || ''
    this.feed = opts.feed || ''
  }
}

module.exports = {Feed}
