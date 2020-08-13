module.exports = {
    name: "ticket",
    description: "reports and bugs of the server (support)",
    execute(message, RichEmbed, args){
        const discord = require('discord.js');
        const client = new discord.Client();
        const {token} =require ('/Users/santi/Desktop/RivalsBot/config.json');
        let ticketespera = new RichEmbed()
        .setColor('RED')
        .setTitle('ERROR')
        .addField('Algo salio mal :(', 'Usted ya tiene un ticket en espera')
        .setFooter('MCraft Copyright 2020');
        var userTickets = new Map();
        
        client.login(token);
        
        client.on('ready', () => {
            console.log("Ticket Logeado");
        });
        
        client.on('message', message => {

            if(message.author.bot) {
                
                if(message.embeds.length === 1 && message.embeds[0].title===('Soporte de ticket')){
                    message.react('🎫')
                    .then(msgReaction => console.log('Reacted.'))
                    .catch(err => console.log(err));
                }
                if(message.embeds.length === 1 && message.embeds[0].title === ('Ticket de soporte')) {
                    message.react('❌')
                    .then(reaction => console.log("Reacted with " + reaction.emoji.name))
                    .catch(err => console.log(err));
                }
            };
            if(message.content.toLowerCase() === '?sendmsg') {
                const embed = new discord.RichEmbed();
                embed.setAuthor(client.user.username, client.user.displayAvatarURL);
                embed.setTitle('Soporte de ticket');
                embed.setDescription('Reacciona a este mensaje para crear un ticket de soporte.');
                embed.setColor('RED')
                message.channel.send(embed);
            }
        });
        client.on('raw', payload => {
            if(payload.t === 'MESSAGE_REACTION_ADD') {
                if(payload.d.emoji.name === '🎫') 
                {
                    if(payload.d.message_id === '625926893954400266') { 
                        let channel = client.channels.get(payload.d.channel_id) 
                        if(channel.messages.has(payload.d.message_id)) { 
                            return;
                        }
                        else { 
                            channel.fetchMessage(payload.d.message_id)
                            .then(msg => {
                                let reaction = msg.reactions.get('ticketreact:625925895013662721');
                                let user = client.users.get(payload.d.user_id);
                                client.emit('messageReactionAdd', reaction, user);
                            })
                            .catch(err => console.log(err));
                        }
                    }
                }
                else if(payload.d.emoji.name === '❌') {
                    let channel = client.channels.get(payload.d.channel_id);
                    if(channel.messages.has(payload.d.message_id)) {
                        return;
                    }
                    else {
                        channel.fetchMessage(payload.d.message_id)
                        .then(msg => {
                            let reaction = msg.reactions.get('❌');
                            let user = client.users.get(payload.d.user_id);
                            client.emit('messageReactionAdd', reaction, user);
                        })
                    }
                }
            }
        });
        
        client.on('messageReactionAdd', (reaction, user) => {
            if(reaction.emoji.name === '🎫') { 
               var canal = message.guild.channels.find("name", `${user.id}s-ticket`);
                if(message.guild.channels.find("name", `${user.id}s-ticket`)) {

                    user.send(ticketespera ); 
                }
                else {
                    let guild = reaction.message.guild;

                    guild.createChannel(`${user.id}s-ticket`, {
                        type: 'text',
                        permissionOverwrites: [
                            {
                                allow: 'VIEW_CHANNEL',
                                id: user.id
                            },
                            {
                                deny: 'VIEW_CHANNEL',
                                id: guild.id
                            },
                            {
                                allow: 'VIEW_CHANNEL',
                                id: '625907626303160354'
                            },
                            {
                                allow: 'VIEW_CHANNEL',
                                id: message.guild.roles.find("name", "MCraft").id
                            }
                        ]
                    }).then(ch => {
                        userTickets.set(user.id, ch.id);
                        let embed = new discord.RichEmbed();
                        embed.setTitle('Ticket de soporte');
                        embed.setDescription('Porfavor explique brevemente su reporte o problema, en la brevedad un staff le respondera.');
                        embed.setColor('RED');
                        ch.send(embed) // Send a message to user.
                    }).catch(err => console.log(err));
                }
            }
            else if(reaction.emoji.name === '❌') {
                if(userTickets.has(user.id)) {
                    if(reaction.message.channel.id === userTickets.get(user.id)) {
                        let embed = new discord.RichEmbed();
                        embed.setDescription("El ticket se cerrara en 5 segundos.")
                        reaction.message.channel.send(embed);
                        setTimeout(() => {
                            reaction.message.channel.delete('Cerrando ticket')
                            .then(channel => {
                                console.log("Deleted " + channel.name);
                            })
                            .catch(err => console.log(err));
                        }, 5000);
                    }
                }
                else if(reaction.message.guild.channels.some(channel => channel.name.toLowerCase() === user.username + 's-ticket')) {
                    let embed = new discord.RichEmbed();
                    embed.setDescription("the ticket close in five seconds");
                    reaction.message.channel.send(embed);
                    setTimeout(() => {
                        reaction.message.guild.channels.forEach(channel => {
                            if(channel.name.toLowerCase() === user.username + 's-ticket') {
                                channel.delete().then(ch => console.log('Deleted Channel ' + ch.id))
                            }
                        });
                    }, 5000);
                }
            }
        });  
    }}