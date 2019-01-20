const liberch = require('liberch');
class Leavemsg extends liberch.Command {
	constructor() {
		super({ name:'leavemsg', alias:['lmsg'] });
	}

	async execute(client, message, args) {
		const sqlite = new liberch.SQLite3('settings.sqlite');
		if(!args[0]) {
			message.channel.send('disabled leave message');
			await sqlite.update('settings', 'leavemsg', '', 'guild', message.guild.id);
			await sqlite.close();
			return;
		}
		const msg = args.join(' ');
		const guildID = message.guild.id;
		await sqlite.insertIgnore('settings', ['guild', 'leavemsg'], [guildID, msg]);
		await sqlite.update('settings', 'leavemsg', msg, 'guild', guildID);
		await sqlite.close();
		message.channel.send(`leave message selected\npreview:\n\`\`\`${msg}\`\`\``);
	}
}

module.exports = Leavemsg;