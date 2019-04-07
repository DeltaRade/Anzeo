const { PostgreSQL } = require('liberch');
const utils = require('../utils');
module.exports = async (client, member)=>{
	const sql = new PostgreSQL({
		connectionString:process.env.DATABASE_URL,
		ssl:true,
	});
	await sql.connect();
	let settings = await sql.get('settings', 'guild', member.guild.id);
	settings = settings.rows[0];
	await sql.end();
	if(!settings || !settings.welcomechannel || !settings.welcomemsg || settings.welcomemsg == '') {
		return;
	}
	const ch = member.guild.channels.find(x=>x.id === settings.welcomechannel);

	if(!ch) {
		return;
	}
	const msg = utils.replaceMsgVars(settings.welcomemsg, member);
	ch.send(msg);
	const role = member.guild.roles.get(settings.autorolerole);
	if(settings.autoroleenabled && role) {
		member.addRole(role);
	}
};