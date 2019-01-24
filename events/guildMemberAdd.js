const { SQLite3 } = require('liberch');
module.exports = async (client, member)=>{
	const sql = new SQLite3('settings.sqlite');
	const settings = await sql.get('settings', 'guild', member.guild.id);
	sql.close();
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