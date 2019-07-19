const { Command } = require('liberch');
let Kick = new Command({ name: 'kick' });
module.exports = Kick.run((client, message) => {
	const user = message.mentions.members.first();
	if (!user) {
		return message.channel.send('invalid user');
	}

	user.kick(`requested by ${message.author.username}`);
});

module.exports = Kick;
