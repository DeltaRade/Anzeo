const liberch = require('liberch');
class EnableATR extends liberch.Command {
	constructor() {
		super({ name:'toggleautorole', alias:['tarole'] });
	}

	async execute(client, message, args) {
		const sql = new liberch.SQLite3('settings.sqlite');
		const isenabled = await sql.get('settings', 'guild', message.guild.id);
		if(!isenabled || !isenabled.autoroleenabled || isenabled.autoroleenabled === 'false') {
			await sql.insertIgnore('settings', ['guild', 'autoroleenabled'], [message.guild.id, true]);
			await sql.update('settings', 'autoroleenabled', true, 'guild', message.guild.id);
			message.channel.send('autorole enabled');
		}
		else{
			await sql.insertIgnore('settings', ['guild', 'autoroleenabled'], [message.guild.id, false]);
			await sql.update('settings', 'autoroleenabled', false, 'guild', message.guild.id);
			message.channel.send('autorole disabled');
		}

		await sql.close();
	}
}

module.exports = EnableATR;