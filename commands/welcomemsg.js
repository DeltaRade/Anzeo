const liberch = require('liberch');
let WMsg = new liberch.Command({ name: 'welcomemsg', alias: ['wmsg'] });
module.exports = WMsg.run((client, message, args) => {
	if (!args[0]) {
		message.channel.send('disabled welcome message');
		client.settings.set(message.guild.id, 'w_msg', '');
		return;
	}
	const msg = args.join(' ');
	client.settings.set(message.guild.id, 'w_msg', msg);
	message.channel.send(
		`welcome message selected\npreview:\n\`\`\`${msg}\`\`\``
	);
});
