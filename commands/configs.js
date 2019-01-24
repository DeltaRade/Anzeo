const liberch = require('liberch');
const { RichEmbed } = require('discord.js');
class Status extends liberch.Command {
	constructor() {
		super({ name:'configs' });
	}

	async execute(client, message) {
		const guild = message.guild;
		const sql = new liberch.SQLite3('settings.sqlite');
		const settings = await sql.get('settings', 'guild', message.guild.id);
		const ed = new RichEmbed()
			.setTitle('customizable settings')
			.addField('welcome channel', `<#${settings.welcomechannel}>`, false)
			.addField('welcome message', `\`\`\`${settings.welcomemsg}\`\`\``, false)
			.addField('leave channel', `<#${settings.leavechannel}>`, false)
			.addField('leave message', `\`\`\`${settings.leavemsg}\`\`\``)
			.addField('autorole status', settings.autoroleenabled || false, false)
			.addField('autorole role', settings.autorolerole ? guild.roles.get(settings.autorolerole).name : 'Not Set', false);
		message.channel.send(ed);
		await sql.close();
	}
}

module.exports = Status;