const config = require('../../config.json');

module.exports = {
  name: 'bed',
  description: 'bot tự động tìm giường gần nhất và nằm ngủ',
  /**
   * 
   * @param {mineflayer.Bot} bot 
   * @param {String} user 
   * @param {String} msg 
   * @param {String[]} args 
   */
  async run(bot, user, msg, args) {
    if (config['bot-admin'].admin.includes(user)) {
      goToSleep(bot, user);
    } else {
      bot.chat("Only admin users can use this command.");
    }
  }
};

async function goToSleep(bot, user) {
  const bed = bot.findBlock({
    matching: block => bot.isABed(block)
  });
  if (bed) {
    try {
      await bot.sleep(bed);
      bot.chat(`$${user} Spawn point set!`);
      setTimeout(() => { wakeUp(bot, user) }, 5000);
    } catch (err) {
      bot.chat(`$${user} Unable to sleep: ${err.message}`);
      console.error('Error while sleeping:', err);
    }
  } else {
    bot.chat(`${user} No nearby bed`);
  }
}

async function wakeUp(bot, user) {
  try {
    await bot.wake();
    bot.chat(`${user} Waking up.`);
  } catch (err) {
    bot.chat(`${user} Unable to wake up: ${err.message}`);
    console.error('Error while waking up:', err);
  }
}
