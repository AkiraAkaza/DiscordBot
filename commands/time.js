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
        const thuMap = {
            'Sunday': 'Chủ Nhật',
            'Monday': 'Thứ Hai',
            'Tuesday': 'Thứ Ba',
            'Wednesday': 'Thứ Tư',
            'Thursday': 'Thứ Năm',
            'Friday': 'Thứ Sáu',
            'Saturday': 'Thứ Bảy'
          };
        const thu = thuMap[moment.tz('Asia/Ho_Chi_Minh').format('dddd')];
        bot.chat('Bây giờ là ' + gio + thu + 'Ngày ' + ngay);
    }
}
