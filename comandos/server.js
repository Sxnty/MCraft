const { DEFAULT_PORT } = require('minecraft-lib/lib/apis/Servers');

module.exports = {
    name: "server",
    description: "reports and bugs of the server (support)",
    execute(message, RichEmbed, args){
        const canvas = require ('canvas')
        const ping = require('minecraft-server-util');
        const mcapi = require('mcapi');
        const MCAPI2 = require("minecraft-lib")
        MCAPI2.servers.get("play.hypixel.net")
  .then(server => {
    console.log("IP : " + server.host)
    console.log("Online players : " + server.players.online + "/" + server.players.max)
    console.log("Minecraft Version : " + server.version)
  })
        var status = false;
    (ping('Play.cubecraft.nest', 25565, (error, response) => { 
            if (error) message.channel.send('El servidor')
                console.log(response)
            status = true;
    

            const embed = new RichEmbed()
        .setColor('RED')
        .setTitle('⚔️ '+response.host+' ⚔️')
        .addField("✔️ Estado del server ✔️", status)
        .addField('🎮 Jugadores Online 🎮', response.onlinePlayers)
        .addField("⚠️ Máxima cantidad de jugadores ⚠️", response.maxPlayers)
        .addField("💻 Version 💻", response.version)
        .addField("🛠️ Protocolo 🛠️", response.protocolVersion)
        .setFooter('Nombre de tu servidor 2020 © ')
        .setThumbnail('https://cdn.discordapp.com/attachments/621086220197298176/712409624715985006/rrr.png') //iria logo de tu servidor
        .setImage('http://status.mclive.eu/RivalsCraft/mc.rivalscraft.com/25565/banner.png'); //mc live status de tu servidor
        message.channel.send(embed)
        message.channel.send(response.descriptionText)
    }))
}
}