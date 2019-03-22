const { Command, PostgreSQL } = require('liberch');
let lchannel=new Command({ name:'leavechannel', alias:['lchannel'] })
lchannel.setExecute(async message=> {
		if(!message.member.permissions.has('MANAGE_GUILD')){
			return message.reply('insufficient permissions (needs MANAGE_GUILD)')
		}
		const sql = new PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		const channel = message.channel;
		await sql.upsert('settings', ['guild', 'leavechannel'], [message.guild.id, channel.id], 'guild', 'leavechannel', channel.id);
		await sql.end();
		message.channel.send('leave channel selected');
	})

module.exports = lChannel;