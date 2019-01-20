const { Command, SQLite3 } = require('liberch');
class WChannel extends Command {
	constructor() {
		super({ name:'welcomechannel', alias:['wchannel'] });
	}

	async execute(client, message) {
		const sql = new SQLite3('settings.sqlite');
		const channel = message.channel;
		await sql.insertIgnore('settings', ['guild', 'welcomechannel'], [message.guild.id, channel.id]);
		await sql.update('settings', 'welcomechannel', message.channel.id, 'guild', message.guild.id);
		await sql.close();
		message.channel.send('welcome channel selected');
	}
}

module.exports = WChannel;