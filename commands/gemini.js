const mineflayer = require('mineflayer');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const MODEL = "gemini-pro";

const API_KEY = process.env.API_KEY;

module.exports = {
    name: 'gemini',
    description: 'Chat with gemini ai',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        if (!args[0]) return bot.chat(`Bạn cần đưa ra câu hỏi`);
        const message = args.join(' ');
        
        const ai = new GoogleGenerativeAI(API_KEY);
        const model = ai.getGenerativeModel({
            model: MODEL,
          })

        const { response } = await model.generateContent(message.cleanContent);
        await bot.chat(`@${user.toLowerCase()} ` + response.text())
    }
}
