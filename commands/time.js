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
        var gio = moment.tz("Asia/Ho_Chi_Minh").format("HH:mm:ss")
        var ngay = moment.tz('Asia/Ho_Chi_Minh').format('D/MM/YYY')
        var thu = moment.tz('Asia/Ho_Chi_Minh').format('ddd')
            if (thu == 'Sunday') thu = 'Chủ Nhật'
            if (thu == 'Monday') thu = 'Thứ Hai'
            if (thu == 'Tuesday') thu = 'Thứ Ba'
            if (thu == 'Wednesday') thu = 'Thứ Tư'
            if (thu == 'Thursday') thu = 'Thứ Năm'
            if (thu == 'Friday') thu = 'Thứ Sáu'
            if (thu == 'Saturday') thu = 'Thứ Bảy'
        bot.chat('Bây giờ là ' + gio + thu + 'Ngày ' + ngay);
    }
}
