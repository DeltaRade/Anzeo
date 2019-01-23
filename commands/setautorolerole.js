const liberch = require('liberch');
class SetAutoRoleRole extends liberch.Command {
	constructor() {
		super({ name:'setautorolerole', alias:['setarole'] });
	}
	async execute(client, message, args) {
		const role = message.guild.roles.find(x=>x.name.toLowerCase() == args[0].toLowerCase()) || message.guild.roles.get(args[0]);
		if(!role) {
			return message.channel.send('invalid role name or role id');
		}
		const sql = new liberch.SQLite3('settings.sqlite');
		await sql.insertIgnore('settings', ['guild', 'autorolerole'], [message.guild.id, role.id]);
		await sql.update('settings', 'autorolerole', role.id, 'guild', message.guild.id);
		await sql.close();
		message.channel.send(`set autorole role to: \`\`${role.name}\`\``);
	}
}
module.exports = SetAutoRoleRole;