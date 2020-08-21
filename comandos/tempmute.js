const Discord = require('discord.js')
const ms = require ('ms');
const { time } = require('console');

module.exports.run = async (bot, message, args) => {

let muteado = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!muteado) return message.channel.send('no se encontro al usuario')
if (muteado.hasPermission("MANAGE_MESSAGES")) return('No tengo permisos para kickear a ese usuario');
let rolmuteado = message.guild.roles.find('name', 'muteado');
if(!rolmuteado) {
    try {
        rolmuteado = await message.guild.createRole({
            name: 'Muteado',
            color: '#000000',
            permissions: []
        })
        message.guild.channel.forEach(async (channel, id) => {
            await channel.overWritePermissions(rolmuteado, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
            });
        });
    }catch(e){
        console.log(e.stack);
    }
}

let tiempo = args.slice(1).join(" ")
if(!tiempo) return message.channel.send('no tiempo');

await(muteado.addRole(rolmuteado.id));
message.channel.send(`<@${muteado.id}> fue muteado por ${ms(tiempo)}`);

setTimeout(function(){
muteado.removeRole(rolmuteado.id)
message.channel.send('desmuteado maleta')
}, ms(tiempo));

}

module.exports.help = {
    name: "tempmute"
}