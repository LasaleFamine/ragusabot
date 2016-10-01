'use strict'

const messages = {
  default: name => {
    return `
      Ciao ${name}, sono Ragusa Bot. Posso fornirti le ultimissime notizie sulla provincia di Ragusa.
      Puoi chiedermi di cronaca, cultura, sport, attualità e politica.
      Scrivi "cam" per l'immagine live della cam di Marina di Ragusa.
      "Vuoi darmi un suggerimento? Scrivi "Consiglio:" seguito dal tuo messaggio!"
    `
  }
}

module.exports = {messages}
