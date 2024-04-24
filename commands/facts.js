const mineflayer = require('mineflayer')
const { facts } = require('../config.json')

module.exports = {
    name: 'facts',
    description: 'Đưa ra một sự thật nổ não',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        let randomFact = facts[Math.floor(Math.random() * facts.length)];
        bot.chat(randomFact)
    }
}