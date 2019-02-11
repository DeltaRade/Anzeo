const { PostgreSQL } = require('liberch');
module.exports = async (client)=>{
	console.log(`ready ${client.user.username}`);
	client.user.setActivity('Li | . | &');
	const db = new PostgreSQL({
		connectionString:process.env.DATABASE_URL,
		ssl:true,
	});
	await db.connect();
	await db.query('CREATE TABLE IF NOT EXISTS settings(guild text UNIQUE, welcomemsg text, welcomechannel text, leavemsg text, leavechannel text, autoroleenabled text, autorolerole text)');
	await db.end();
	// client.emit('guildMemberAdd', client.guilds.first().me);
};