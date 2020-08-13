module.exports = {
    name: "server",
    description: "reports and bugs of the server (support)",
    execute(message, RichEmbed, args){
        const ping = require('minecraft-server-util');
        const mcapi = require('mcapi');
        var status = false;
    (ping('mc.rivalscraft.com', 25565, (error, response) => { 
            if (error) throw error
                console.log(response)
            status = true;
                

            const embed = new RichEmbed()
        .setColor('RED')
        .setTitle('⚔️ Nombre de tu servidor ⚔️')
        .addField("✔️ Estado del server ✔️", status)
        .addField('🎮 Jugadores Online 🎮', response.onlinePlayers)
        .addField("⚠️ Máxima cantidad de jugadores ⚠️", response.maxPlayers)
        .addField("💻 Version 💻", response.version)
        .addField("🛠️ Protocolo 🛠️", response.protocolVersion)
        .setFooter('Nombre de tu servidor 2020 © ')
        .setThumbnail('https://cdn.discordapp.com/attachments/621086220197298176/712409624715985006/rrr.png') //iria logo de tu servidor
        .setImage('http://status.mclive.eu/RivalsCraft/mc.rivalscraft.com/25565/banner.png'); //mc live status de tu servidor
        message.channel.send(embed)
    }))

}

}