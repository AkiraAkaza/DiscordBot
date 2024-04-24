const mineflayer = require('mineflayer');
const mcData = require('minecraft-data');
const config = require('../config.json');
const version = config.server.version;

module.exports = {
    name: 'kit',
    description: 'Find the nearest chest, open it, retrieve the first item, and then close the chest.',
    /**
     * 
     * @param {mineflayer.Bot} bot 
     * @param {String} user 
     * @param {String} msg 
     * @param {String[]} args 
     */
    async run(bot, user, msg, args) {
        const data = mcData(version);
        const shulkers = data.itemsArray
            .filter((item) => /^.*_shulker_box/.test(item.name))
            .map((item) => item.name);

        const chestBlock = bot.findBlock({
            matching: data.blocksByName["chest"].id, 
            maxDistance: 2
        });

        if (chestBlock) {
            bot.openChest(chestBlock).then(chest => {
                if (chest) {
                    const containedShulkers = chest.containerItems().filter(item => shulkers.includes(item.name));
                    if (!containedShulkers.length) {
                        bot.chat(`/msg ${user} Out of shulker boxes, try again later`);
                    } else {
                      chest.withdraw(containedShulkers[0].type, null, 1)
                      .then(() => {
                        chest.close();
                      })
                      .catch(error => {
                        if (error.message.includes("Server didn't respond to transaction")) {
                          console.error("Failed to withdraw shulker box due to server not responding to transaction.");
                        } else {
                          console.error("Error withdrawing shulker box:", error);
                        }
                        chest.close();
                      });
                    }
                } else {
                    console.error("Failed to open chest.");
                }
            }).catch(error => {
                console.error("Error opening chest:", error);
            });
        } else {
            console.error("No trapped chest found nearby.");
        }
    }
};
