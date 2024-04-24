const mineflayer = require('mineflayer');

module.exports = {
    name: 'skin',
    description: 'Thay đổi skin cho bot',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        if (!args[0]) return bot.chat(`Bạn cần phải nhập tên skin`);

        const skinName = args.join(' ');
        bot.chat(`/skin ${skinName}`);

      bot.on("messagestr", (message) => {
        if (message.includes("[SkinsRestorer] Your skin has been changed.")) {
          bot.chat(`Đã thành công đổi skin ${skinName} từ user ${user.toLowerCase()}`);
      }
        if (message.includes("[SkinsRestorer] Error: Premium player with that name does not exist.")) {
          bot.chat(`Lỗi khi đổi skin ${skinName} vì tên này không tồn tại trong danh sách premium player`);
        }
    })
  }
};

// [SkinsRestorer] Your skin has been changed.
// [SkinsRestorer] Error: Premium player with that name does not exist.