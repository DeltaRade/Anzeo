const liberch = require('liberch');
const { RichEmbed } = require('discord.js');
let Status=new liberch.Command({name:'configs'})
module.exports=Status.run((client,message)=>{

		const guild = message.guild;
		const settings=client.settings.getAll(guild.id)
		if(!settings) {
			return message.channel.send('Data unavailable');
		}
		const ed = new RichEmbed()
			.setColor('FFB766')
			.setTitle('customizable settings')
			.addField('welcome channel', settings.welcomechannel ? `<#${settings.welcomechannel}>` : 'Not Set', false)
			.addField('welcome message', `\`\`\`${settings.welcomemsg}\`\`\``, false)
			.addField('leave channel', settings.leavechannel ? `<#${settings.leavechannel}>` : 'Not Set', false)
			.addField('leave message', `\`\`\`${settings.leavemsg}\`\`\``)
			.addField('autorole status', settings.autoroleenabled || 'disabled', false)
			.addField('autorole role', settings.autorolerole ? guild.roles.get(settings.autorolerole).name : 'Not Set', false);
		message.channel.send(ed);
	})

module.exports = Status;