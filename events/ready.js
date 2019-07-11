const { SQLite3 } = require('liberch');
module.exports = (client)=>{
	console.log(`ready ${client.user.username}`);
	client.user.setActivity('Li | . | &');

	// client.emit('guildMemberAdd', client.guilds.first().me);
};