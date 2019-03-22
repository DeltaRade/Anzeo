const liberch = require('liberch');
const leavemsg = new liberch.Command({ name:'leavemsg', alias:['lmsg'] });
leavemsg.setExecute(async (message, args)=> {

	if(!message.member.permissions.has('MANAGE_GUILD')) {
		return message.reply('insufficient permissions (needs MANAGE_GUILD)');
	}
	const sqlite = new liberch.PostgreSQL({
		connectionString:process.env.DATABASE_URL,
		ssl:true,
	});
	await sqlite.connect();
	if(!args[0]) {
		message.channel.send('disabled leave message');
		await sqlite.upsert('settings', ['guild', 'leavemsg'], [message.guild.id, ''], 'guild', 'leavemsg', '');
		// await sqlite.update('settings', 'leavemsg', '', 'guild', message.guild.id);
		await sqlite.end();
		return;
	}
	const msg = args.join(' ');
	const guildID = message.guild.id;
	await sqlite.upsert('settings', ['guild', 'leavemsg'], [guildID, msg], 'guild', 'leavemsg', msg);
	await sqlite.end();
	message.channel.send(`leave message selected\npreview:\n\`\`\`${msg}\`\`\``);
});
module.exports = leavemsg;