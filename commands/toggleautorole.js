const liberch = require('liberch');
let EnableATR = new liberch.Command({
	name: 'toggleautorole',
	alias: ['tarole'],
});
module.exports = EnableATR.run((client, message, args) => {
	const isenabled = client.settings.get(message.guild.id, 'a_enabled', false);
	if (!isenabled) {
		client.settings.set(message.guild.id, 'a_enabled', true);
		message.channel.send('autorole enabled');
	} else {
		client.settings.set(message.guild.id, 'a_enabled', false);
		message.channel.send('autorole disabled');
	}

	// await sql.end();
});
