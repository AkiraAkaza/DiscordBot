require('dotenv').config();

const mineflayer = require('mineflayer');
const tpsPlugin = require('mineflayer-tps')(mineflayer)
const fs = require('fs');
const config = require('./config.json');
const { loginBot } = require('./function');
const prefix = config['bot-admin'].prefix;
const livechat = config.discord.livechat;

const { Client, EmbedBuilder, GatewayIntentBits } = require("discord.js");
const { GuildMessages, Guilds } = GatewayIntentBits;
const client = new Client({ intents: [Guilds, GuildMessages] });
const ms = require('ms');

function createBot() {
   const bot = mineflayer.createBot({
      username: config['bot-account']['username'],
      password: config['bot-account']['password'],
      auth: config['bot-account']['type'],
      host: config.server.ip,
      port: config.server.port,
      version: config.server.version,
   });

    loginBot(bot);
    bot.loadPlugin(tpsPlugin);
    bot.commands = [];

    fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
      .forEach(file => {
        const pull = require(`./commands/${file}`);
          if (pull.name) {
            bot.commands.push(pull);
          }
      });

  fs.readdirSync('./commands/admin').filter(file => file.endsWith('.js'))
    .forEach(file => {
      const pull = require(`./commands/admin/${file}`);
        if (pull.name) {
          bot.commands.push(pull);
        }
    });

    bot.on('chat', async (user, msg) => {
        if (!msg.startsWith(prefix)) return;
        const args = msg.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const command = bot.commands.find(c => c.name == cmd);
        if (command) {
            if (command.admin && user.trim() !== config.admin) return;
            command.run(bot, user, msg, args);
        }
    });

  bot.on('message', (message) => {
    if (config.utils['chat-log']) {
    console.log(message.toAnsi())
    }
  })

  bot.on('kicked', console.log)
  bot.on('error', console.log)
  
  bot.once('spawn', () => {
   if (config.utils['auto-reconnect']) {
      bot.on('end', () => {
          setTimeout(() => {
            createBot();
         }, config.utils['auto-reconnect-delay']);
      });
    }
  });

    bot.once('login', () => {
      bot.once('spawn', () => {
        const spawn = new EmbedBuilder()
          .setTitle(`**${bot.username} đã thành công truy cập vào ${config.server.ip}.**`)
          .setColor(0x008000)
          .setFooter({ text: config.server.ip })
          .setTimestamp();
        const channel = client.channels.cache.get(livechat);
        if (channel) {
            channel.send({ embeds: [spawn] });
        } else {
            console.error(`Không tìm thấy channel id! ${livechat}`);
        }
      });
    });

    var reconnect = config.utils["auto-reconnect-delay"];

    bot.on('end', (reason) => {
      const end = new EmbedBuilder()
        .setTitle(`**${bot.username} bị mất kết nối, lý do: \`${reason}\`\, kết nối lại sau ${reconnect} giây**`)
        .setColor(0xff0000)
        .setTimestamp()
        .setFooter({ text: config.server.ip });
      if (client.channels.cache) {
        const channel = client.channels.cache.get(livechat);
        if (channel) {
          channel.send({ embeds: [end] });
          setTimeout(() => {
            const relog = new EmbedBuilder()
              .setTitle(`**Đang kết nối lại với server...**`)
              .setColor(0xffff00)
              .setTimestamp()
              .setFooter({ text: config.server.ip });
            if (client.channels.cache) {
              client.channels.cache.get(livechat).send({ embeds: [relog] });
              createBot();
            }
          }, ms(`${reconnect}s`));
        }
      } else {
        console.error(`Client channels cache is not available.`);
      }
    });

    bot.on('chat', (username, message) => {
      if (username === bot.username) return;
      const embed = new EmbedBuilder()
        .setTitle(`**${username}**`)
        .setDescription(`**\`${message}\`**`)
        .setColor(0xffffff)
        .setTimestamp()
        .setFooter({ text: config.server.ip });
      if (client.channels.cache) {
        const channel = client.channels.cache.get(livechat);
        if (channel) {
          channel.send({ embeds: [embed] });
        } else {
          console.error(`Channel with ID ${livechat} not found.`);
        }
      } else {
        console.error('client.channels.cache is undefined.');
      }
    });

    client.once('ready', () => {
      console.log(`Discord bot logged in as ${client.user.tag}`);
      const channel = client.channels.cache.get(livechat);
      if (!channel) {
        console.log(`I could not find the channel (${config.discord.livechat})!`);
        process.exit(1);
      } else {
        channel.send(`Discord bot logged in as ${client.user.tag}`);
      }
    });

    client.login(process.env.token);
  // client.login(config.discord.token);
}


createBot();
