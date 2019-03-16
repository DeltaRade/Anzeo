const { Command, PostgreSQL } = require('liberch');
let wchannel=new Command({ name:'welcomechannel', alias:['wchannel'] })
wchannel.setExecute (message=> {
		if(!message.member.permissions.has('MANAGE_GUILD')){
			return message.reply('insufficient permissions (needs MANAGE_GUILD)')
		}
		const sql = new PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		const channel = message.channel;
		await sql.upsert('settings', ['guild', 'welcomechannel'], [message.guild.id, channel.id], 'guild', 'welcomechannel', channel.id);
		await sql.end();
		message.channel.send('welcome channel selected');
	})

module.exports = wchannel;