const { Command } = require('liberch');
let WChannel = new Command({ name: 'welcomechannel', alias: ['wchannel'] });
module.exports = WChannel.run((client, message) => {
	const channel = message.channel;
	client.settings.set(message.guild.id, 'w_channel', channel);
	message.channel.send('welcome channel selected');
});
