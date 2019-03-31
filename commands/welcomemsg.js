const { Command, PostgreSQL } = require('liberch');
const wmsg = new Command({ name:'welcomemsg', alias:['wmsg'], description:'sets the welcome message.\naccepted variables are `{mention}`,`{tag}`' });
wmsg.setExecute (async (message, args)=> {
	if(!message.member.permissions.has('MANAGE_GUILD')) {
		return message.reply('insufficient permissions (needs MANAGE_GUILD)');
	}
	const sql = new PostgreSQL({
		connectionString:process.env.DATABASE_URL,
		ssl:true,
	});
	await sql.connect();
	if(!args[0]) {
		message.channel.send('disabled welcome message');
		await sql.upsert('settings', ['guild', 'welcomemsg'], [message.guild.id, ''], 'guild', 'welcomemsg', '');
		await sql.end();
		return;
	}
	const msg = args.join(' ');
	const guildID = message.guild.id;
	await sql.upsert('settings', ['guild', 'welcomemsg'], [guildID, msg], 'guild', 'welcomemsg', msg);
	await sql.end();
	message.channel.send(`welcome message selected\npreview:\n\`\`\`${msg}\`\`\``);
});

module.exports = wmsg;