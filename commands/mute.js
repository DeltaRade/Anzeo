const liberch = require('liberch');
const ms = require('ms');
class MuteCommand extends liberch.Command {
	constructor() {
		super({ name:'mute', usage:'mute {mention} {time?}(defaults to infinite)' });
	}
	async execute(client, message, args) {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return;
		}
		const person = message.mentions.members.first();
		args.shift();
		let time = args.shift();
		if(!person) {return message.channel.send('no one was found...*boi*');}
		if(!time) {
			message.channel.send('no time provided, stting it to 0(infinite)');
			time = 0;
		}

		let role = await message.guild.roles.find(x=>x.name === 'Limuted');

		if(!role) {
			message.channel.send('no muted role found... creating one');
			role = await message.guild.createRole({ name:'Limuted' });

			message.guild.channels.forEach(ch=>{
				ch.overwritePermissions(role.id, { 'VIEW_CHANNEL':false });// VIEW_CHANNEL or SEND_MESSAGES
			});

		}
		// setTimeout(()=>{
		await person.addRole(role);
		message.channel.send(`${person.user.tag} has been muted for ${ms(ms(time), { long:true })}`);
		if(time != 0) {
			setTimeout(async () => {
				try{
					await person.removeRole(role);
				}
				catch(e) {

				}
				message.channel.send(`unmuted ${person.user.tag}`);
			}, ms(time));
		}
	}
}

module.exports = MuteCommand;