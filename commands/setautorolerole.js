const liberch = require('liberch');
let SetAutoRole = new liberch.Command({
	name: 'autorole',
	alias: ['setarole'],
});
module.exports = SetAutoRole.run(async (client, message, args) => {
	const role =
		message.guild.roles.find(
			(x) => x.name.toLowerCase() == args[0].toLowerCase()
		) || message.guild.roles.get(args[0]);
	if (!role) {
		return message.channel.send('invalid role name or role id');
	}
	client.settings.set(message.guild.id,'a_role',role.id)
	message.channel.send(`set role to: \`\`${role.name}\`\``);
});