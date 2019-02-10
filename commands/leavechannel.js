const { Command, PostgreSQL } = require('liberch');
class LChannel extends Command {
	constructor() {
		super({ name:'leavechannel', alias:['lchannel'] });
	}

	async execute(client, message) {
		const sql = new PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		const channel = message.channel;
		await sql.insertOrUpdate('settings', ['guild', 'leavechannel'], [message.guild.id, channel.id]);
		await sql.end();
		message.channel.send('leave channel selected');
	}
}

module.exports = LChannel;