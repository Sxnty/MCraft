const { Client, RichEmbed, Attachment, Collection } = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const {token, owner} =require ('./config.json');
const fs = require("fs");
bot.commands = new Discord.Collection();
const PREFIX = "?";
var userTickets = new Map();
//mc apis
const ping = require('minecraft-server-util');
const mcapi = require('mcapi');

const commandfiles = fs.readdirSync('./comandos/').filter(file => file.endsWith('.js'));
for (const file of commandfiles) {
  const command = require(`./comandos/${file}`);
  bot.commands.set(command.name, command);
}
bot.on('ready', () => { //status y online
  console.log(`MCraftBot logeado`);
  bot.user.setActivity('Aqui iria tu', { type: 'PLAYING' }).catch(console.error);
})
bot.on("guildCreate", guild => {
    guild.createRole({ name: 'MCraft', permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'] });
})

bot.on('message', message => {
  let args = message.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {

    case "server":
      bot.commands.get('server').execute(message, RichEmbed, args)
      break;
      case "sendmsg":
      bot.commands.get('ticket').execute(message, RichEmbed, args)
    break;
    case "helpstaff":
      bot.commands.get('helpstaff').execute(message, RichEmbed, args)
}});

bot.login(token);