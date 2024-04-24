const mineflayer = require('mineflayer');

module.exports = {
    name: 'tps',
    description: 'xem tps của server',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
          bot.chat('Current tps: ' + bot.getTps())
    }
}