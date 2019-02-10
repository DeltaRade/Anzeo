const { PostgreSQL } = require('liberch');
module.exports = async (client, member)=>{
	const sql = new PostgreSQL({
		connectionString:process.env.DATABASE_URL,
		ssl:true,
	});
	const settings = await sql.get('settings', 'guild', member.guild.id);
	await sql.end();
	if(!settings || !settings.leavechannel || !settings.leavemsg || settings.leavemsg == '') {
		return;
	}
	const ch = member.guild.channels.find(x=>x.id === settings.leavechannel);

	if(!ch) {
		return;
	}
	let msg = settings.leavemsg;
	msg = msg.replace('{mention}', `<@${member.id}>`);
	msg = msg.replace('{tag}', member.user.tag);
	ch.send(msg);
};