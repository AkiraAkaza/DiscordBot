const fs = require('fs');
const config = require('./config.json');

async function loginBot(bot) {
 const password = config.utils['auto-auth'].password;

bot.once("spawn", () => {
  bot.on("messagestr", (message) => {
    if (message.includes("/register")) {
      bot.chat(`/register ${password} ${password}`);
    } else if (message.includes("/login")) {
      setTimeout(() => {
        bot.chat(`/login ${password}`);
        setTimeout(() => {
          bot.setQuickBarSlot(0);
          bot.activateItem(false);
          bot.on("windowOpen", function (window) {
            bot.clickWindow(13, 0, 0);
          });
        }, 1000);
      }, 1000);
    }
  });
     
      if (config.utils['chat-messages'].enabled) {
         console.log('Started chat-messages module');

         let messages = config.utils['chat-messages']['messages'];

         if (config.utils['chat-messages'].repeat) {
            let delay = config.utils['chat-messages']['repeat-delay'];
            let i = 0;

            setInterval(() => {
               bot.chat(`${messages[i]}`);

               if (i + 1 === messages.length) {
                  i = 0;
               } else i++;
            }, delay * 1000);
         } else {
            messages.forEach((msg) => {
               bot.chat(msg);
            });
         }
      }

      
      if (config.utils['bot_whisper'].enabled) {
         console.log('Started whipper-chat-messages module');

        const colorCodes = config.utils['bot_whisper'].colorCodes;
        const colorFonts = config.utils['bot_whisper'].colorFonts;
        const delays = config.utils['bot_whisper']['repeat-delay']
        let messages = config.utils['bot_whisper']['messages'];
        let randomColor = `&${colorCodes[Math.floor(Math.random() * colorCodes.length)]}`
        let randomFont = `&${colorFonts[Math.floor(Math.random() * colorFonts.length)]}`
        
      setInterval(() => {
        if (Object.keys(bot.players).length > 1) {
          const randomPlayer = getRandomPlayer([bot.username, ...whisper.blacklist]);
          if (randomPlayer) {
            if (config.utils['bot_whisper']['fancy-chat'] || true) {
            bot.chat(`/w ${randomPlayer} ${randomColor}${randomFont} ${messages}`);
            }
            if (config.utils['bot_whisper']['fancy-chat'] || false) {
            bot.chat(`/w ${randomPlayer} ${messages}`);
            }
          }
        }
      }, delays * 1000);


    const whisper = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

    function getRandomPlayer(exclude) {
      const players = Object.keys(bot.players).filter(player => !exclude.includes(player));
       return players[Math.floor(Math.random() * players.length)];
        }

    function isBlacklisted(player) {
      return dms.blacklist.includes(player.toLowerCase());
       }    
      }
   });
}

async function randomSrc() {
    const vncode = 'abcdefghijklmnopqrstuvwxyz';
    let rdChars = '';
    for (let i = 0; i < 2; i++) {
        rdChars += vncode.charAt(Math.floor(Math.random() * vncode.length));
    }
    return rdChars;
}

module.exports = { loginBot, randomSrc };
