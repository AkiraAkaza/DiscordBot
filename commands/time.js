const mineflayer = require('mineflayer')
const moment = require('moment-timezone');

module.exports = {
    name: 'time',
    description: 'Theo dõi thời gian thực tế của múi giờ +7',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
      const day = moment().tz('Asia/Ho_Chi_Minh').format(`dddd`);
      const tim = moment().tz('Asia/Ho_Chi_Minh').format(`DD/MM/YYYY`);
      const time = moment().tz('Asia/Ho_Chi_Minh').format(`HH:mm:ss`);
      bot.chat(`Hôm nay là thứ ${day} ngày ${tim} bây giờ là ${time}`);
    }
}