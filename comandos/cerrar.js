
module.exports = {
    name: "cerrar",
    description: "send the help command in DM",
    execute(message, RichEmbed, args) {
        if (message.channel.name.startsWith(`${message.author.id}-ticket`)) {
            console.log(`${message.author.username} cerro el ticket ${message.channel.name}`);
            message.channel.setName(`${message.channel.name}+ finish`)
            message.channel.send("El encargado del ticket ha finalizado el mismo.");
            message.channel.overwritePermissions(message.author, {
              VIEW_CHANNEL: false,
            })
    
          }

}
        
          
    }