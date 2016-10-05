# Ragusa Bot | Your best news reporter of Ragusa and province


<p align="center">
  <a href="https://ragusabot.com">
    <img src="assets/RAGUSABOT-logo.png" alt="Ragusa Bot"/>
  </a>
</p>

---

[![Build Status](https://travis-ci.com/LasaleFamine/ragusabot.svg?token=RmWdev7p6ZX1E14v2rQp&branch=master)](https://travis-ci.org/lasalefamine/ragusabot)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/lasalefamine/ragusabot)

> Built on top of [Bot Framework V3 (NodeJs)](https://github.com/Microsoft/BotBuilder)

## What

Ragusa Bot is a Facebook and Telegram bot that lets you get when you want the latest news of the province of Ragusa.  
You can ask for the daily news, politics, current events, sports, etc. directly by sending a message on the Facebook page or through Telegram. Of course everything needs to be ask in italian :it:  
Try now!

[![Fb](assets/Facebook_Messenger.png)](http://m.me/ragusabot)
[![Telegram](assets/Telegram.png)](https://telegram.me/ragusabot)

## Mission
Give opportunities to all citizens of the province of Ragusa to stay up-to-date and read local news quickly and easily directly on the smartphone.

## Develop

Built with the [Bot Framework V3]() and so written in NodeJs. I used the ES6 syntax so Node > 6 is required.

### Install

    $ git clone https://github.com/lasalefamine/ragusabot
    $ npm install

### Run in DEV mode

#### [ngrok](https://ngrok.com/)

You can use [***ngrok***](https://ngrok.com/) to run in testing mode the application and make it available to the Microsoft Bot Builder service.  
If you are not familiar with the Bot Framework I have made a "learning" repository for it: [learning-ms-bot-builder](https://github.com/LasaleFamine/learning-ms-bot-builder)

> NOTE: don't forget to de-comment the `dotenv` require in the `config.js` file and create a `.env` file with the needed env variables:

src/config.js (require `dotenv`)
``` js
'use strict'

require('dotenv').config()
const builder = require('botbuilder')
const restify = require('restify')

[...]
```
src/.env
```
GOOGLE_SHORTNER_KEY={KEY}
MICROSOFT_APP_ID={KEY}
MICROSOFT_APP_PASSWORD={KEY}
```

#### `ConsoleConnector`

### Test

> Currently only [xo]()

    $ npm test

## TODO

- TESTs
