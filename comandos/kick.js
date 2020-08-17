const { receiveMessageOnPort } = require("worker_threads");

module.exports = {
    name: "kick",
    description: "kick command",
    execute(message, RichEmbed, args){
        //EMBED ERROR USUARIO
        let persona = new RichEmbed()
        .setColor('RED')
        .setTitle('Ocurrio un problema :(')
        .addField('❌ Error de sintaxis ❌', 'Necesitas mencionar a un miembro para hecharlo.');
        //EMBED ERROR NO TIENES PERMISOS
        let nopermiso = new RichEmbed()
        .setColor('RED')
        .setTitle('Ocurrio un problema :(')
        .addField('❌ Error de sintaxis ❌', 'No tienes permisos para ejecutar este comando.');
        //EMBED ERROR NO PUEDO HACER ESTO
        let nopermisobot = new RichEmbed()
        .setColor('RED')
        .setTitle('Ocurrio un problema :(')
        .addField('❌ Error de sintaxis ❌', 'No tengo permisos suficientes para hechar al usuario mencionado.');
        //EMBED ERROR NO RAZON ESPECIFICADA
        let norazon = new RichEmbed()
        .setColor('RED')
        .setTitle('Ocurrio un problema :(')
        .addField('❌ Error de sintaxis ❌', 'Necesitas especificar una razon.');


        if(!message.member.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(nopermiso)

        let kickMember = message.mentions.members.first() || message.guild.members.get(args[0]) 


        
        if(!kickMember) return message.channel.send(persona)
        let reason = args.slice(2).join(" ")
        if (!reason) return message.channel.send(norazon)
    
        if(kickMember.hasPermission(["KICK_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(nopermisobot)
    
        kickMember.send(`Hola, fuiste hechado de ${message.guild.name} por la razon: ${reason}`).then(() => 
        kickMember.kick()).catch(err => console.log(err))
    
        message.channel.send(`**${kickMember.user.tag}** has been kicked`).then(m => m.delete(5000))
    
                //EMBED LOG
                let log = new RichEmbed()
                .setColor('RED')
                .setTitle('Log de moderacion')
                .setThumbnail(kickMember.user.avatarURL)
                .addField("Sancion:", "kick")
                .addField("Sancionado:", kickMember.user.username)
                .addField("Ejecutor:", message.author.username)
                .addField("Razon:", reason)
                .addField("Fecha:", message.createdAt.toLocaleString())
        
            let canallog = message.guild.channels.find(c => c.name === "mcraft-logs").id
            message.guild.channels.get(canallog).send(log);
            //    guild.channels.get(canallog).send(log)
           // message.channel.send(log)
    
    }}