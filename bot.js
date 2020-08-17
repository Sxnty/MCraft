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
const { type } = require('os');

const commandfiles = fs.readdirSync('./comandos/').filter(file => file.endsWith('.js'));
for (const file of commandfiles) {
  const command = require(`./comandos/${file}`);
  bot.commands.set(command.name, command);
}
bot.on('ready', () => { //status y online
  console.log(`MCraftBot logeado`);
  console.log('cantidad de servidores conectados: '+bot.guilds.size)
  bot.user.setActivity('MCraft', { type: 'PLAYING' }).catch(console.error);
})
bot.on("guildCreate", guild => {
    guild.createRole({ name: 'MCraft', permissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'] });
    const role = guild.roles.find(role => role.name === 'MCraft').id;
    guild.createChannel(`MCRAFT Logs`, {
      type: 'text',
      permissionOverwrites: [
          {
              allow: 'VIEW_CHANNEL',
              id: role
          },
          {
            deny: 'VIEW_CHANNEL',
            id: guild.id
          }
        ]})
    //                    guild.createChannel(`${user.id}s-ticket`, {

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
    break;
    case 'kick':
      bot.commands.get('kick').execute(message, RichEmbed, args)
    break;
}});

bot.login(token);