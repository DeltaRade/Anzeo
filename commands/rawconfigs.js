const liberch = require('liberch');
class RawStatus extends liberch.Command {
	constructor() {
		super({ name:'rawconfigs', description:'sends raw Database data of the guild the command is used in' });
	}

	async execute(client, message) {
		const guild = message.guild;
		if(!guild) return;
		const sql = new liberch.PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		let settings = await sql.get('settings', 'guild', message.guild.id);
		settings = settings.rows[0];
		if(!settings) {
			return message.channel.send('Data unavailable');
		}
		message.channel.send(`Raw config data.\n\`\`\`js\n${ require('util').inspect(settings) }\`\`\``);
		await sql.end();
	}
}

module.exports = RawStatus;