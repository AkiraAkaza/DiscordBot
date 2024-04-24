const fs = require('fs');
const mineflayer = require('mineflayer');
const config = require('../config.json');

module.exports = {
    name: 'help',
    description: 'Xem toàn bộ lệnh của bot',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        if (!args[0]) {
            const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js')).map(f => f.substring(0, f.indexOf('.js')));
            if (config['bot-admin'].admin.includes(user)) {
              const Afile = fs.readdirSync('./commands/admin').filter(file => file.endsWith('.js')).map(f => f.substring(0, f.indexOf('.js')));
                bot.whisper(user, `Hiện tại có các lệnh: ${Afile.join(', ')}`);
            } else {
                bot.chat('Hiện tại có các lệnh: ' + files.join(', '));
            }
        } else {
            const cmd = await bot.commands.find(c => c.name == args[0]);
            if (!cmd) return bot.whisper(user, `Không có lệnh ${args[0]}`);
            bot.chat(
                `Lệnh: ${cmd.name} - Mô tả: ${cmd.description}`
            );
        }
    }
};
