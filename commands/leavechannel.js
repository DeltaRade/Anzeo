const { Command } = require('liberch');
let LChannel = new Command({ name: 'leavechannel', alias: ['lchannel'] });
module.exports = LChannel.run((client, message) => {
	const channel = message.channel;
	client.settings.set(message.guild.id, 'l_channel', channel.id);
	message.channel.send('leave channel selected');
});
