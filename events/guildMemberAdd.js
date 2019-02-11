const { PostgreSQL } = require('liberch');
module.exports = async (client, member)=>{
	const sql = new PostgreSQL({
		connectionString:process.env.DATABASE_URL,
		ssl:true,
	});
	const settings = await sql.get('settings', 'guild', member.guild.id);
	await sql.end();
	if(!settings || !settings.welcomechannel || !settings.welcomemsg || settings.welcomemsg == '') {
		return;
	}
	const ch = member.guild.channels.find(x=>x.id === settings.welcomechannel);

	if(!ch) {
		return;
	}
	let msg = settings.welcomemsg;
	msg = msg.replace('{mention}', `<@${member.id}>`);
	msg = msg.replace('{tag}', member.user.tag);
	ch.send(msg);
	const role = member.guild.roles.get(settings.autorolerole);
	if(settings.autoroleenabled && role) {
		member.addRole(role);
	}
};