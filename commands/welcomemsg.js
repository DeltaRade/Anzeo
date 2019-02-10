const liberch = require('liberch');
class Welcomemsg extends liberch.Command {
	constructor() {
		super({ name:'welcomemsg', alias:['wmsg'] });
	}

	async execute(client, message, args) {
		const sqlite = new liberch.SQLite3('settings.sqlite');
		if(!args[0]) {
			message.channel.send('disabled welcome message');
			await sqlite.update('settings', 'welcomemsg', '', 'guild', message.guild.id);
			await sqlite.close();
			return;
		}
		const msg = args.join(' ');
		const guildID = message.guild.id;
		await sqlite.insertIgnore('settings', ['guild', 'welcomemsg'], [guildID, msg]);
		await sqlite.update('settings', 'welcomemsg', msg, 'guild', guildID);
		await sqlite.close();
		message.channel.send(`welcome message selected\npreview:\n\`\`\`${msg}\`\`\``);
	}
}

module.exports = Welcomemsg;