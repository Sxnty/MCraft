module.exports = {
    name: "helpstaff",
    description: "envia instrucciones de ayuda al staff",
    execute(message, RichEmbed, args) {
        const embed = new RichEmbed()
        .setColor('RED')
        .setTitle('Ayuda para el staff')
        .addField('Instrucciones', 'Debera darle al staff el rol de "MCraft" (este rol podra controlar mensajes, kickear y banear gente)')
        .addField('Sistema de tickets', '`?sendmsg` Crea el mensaje de reacciones en el canal que fue redactado el comando')
        .addField('Echar usuarios', '`?kick (usuario) (razon)` Echa al usuario mencionado por la razon redactada y envia el log al canal MCraft Logs.')
        .setFooter('En un futuro se crearan nuevas opciones para el staff');
        message.channel.send(embed)
    }}