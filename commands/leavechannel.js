const { Command, SQLite3 } = require('liberch');
class LChannel extends Command {
	constructor() {
		super({ name:'leavechannel', alias:['lchannel'] });
	}

	async execute(client, message) {
		const sql = new SQLite3('settings.sqlite');
		const channel = message.channel;
		await sql.insertIgnore('settings', ['guild', 'leavechannel'], [message.guild.id, channel.id]);
		await sql.update('settings', 'leavechannel', message.channel.id, 'guild', message.guild.id);
		await sql.close();
		message.channel.send('leave channel selected');
	}
}

module.exports = LChannel;