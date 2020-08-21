module.exports = {
    name: "ban",
    description: "reports and bugs of the server (support)",
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

        if(!message.member.hasPermission('BAN_MEMBERS')) {
            message.channel.send(nopermiso)
        }
        let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!banMember) return message.channel.send(persona)

        let reason = args.slice(2).join(" ")
        if (!reason) return message.channel.send(norazon)

        if(banMember.hasPermission(["BAN_MEMBERS"])) return message.channel.send(nopermisobot)



        let sancionado = new RichEmbed()
        .setTitle('MCraft')
        .setColor('RED')
        .addField('Fuiste sancionado en:', message.guild.name)
        .addField("Sancion:", "BAN")
        .addField("Sancionado:", banMember.user.username)
        .addField("Ejecutor:", message.author.username)
        .addField("Razon:", reason)
        .addField('Duracion:', 'Permanente')

        banMember.send(sancionado).then(() => 
        banMember.ban()).catch(err => console.log(err))
    
                //EMBED LOG
                let log = new RichEmbed()
                .setColor('RED')
                .setTitle('Log de moderacion')
                .setThumbnail(banMember.user.avatarURL)
                .addField("Sancion:", "ban")
                .addField("Ejecutor:", message.author.username)
                .addField("Razon:", reason)
                .addField('Duracion:', 'Permanente')
                .addField("Fecha:", message.createdAt.toLocaleString())

        
            let canallog = message.guild.channels.find(c => c.name === "mcraft-logs").id
            message.guild.channels.get(canallog).send(log);
        banMember.send(sancionado).then(() => 
        message.channel.send('lobaneasteaja por'))



       // banMember.ban()).catch(err => console.log(err))
    }
}