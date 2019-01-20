const { SQLite3 } = require('liberch');
module.exports = (client)=>{
	console.log(`ready ${client.user.username}`);
	client.user.setActivity('Li|.|/');
	const db = new SQLite3('settings.sqlite');
	db.createTable('settings', ['guild', 'welcomemsg', 'welcomechannel', 'leavemsg', 'leavechannel']);
	db.close();
	// client.emit('guildMemberAdd', client.guilds.first().me);
};