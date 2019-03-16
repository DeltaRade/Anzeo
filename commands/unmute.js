const {Command} = require('liberch');
let unmute=new Command({name:'unmute'})
unmute.setExecute ((message, args)=> {
		if(!message.member.hasPermission('KICK_MEMBERS')) {
			return;
		}
		const person = message.mentions.members.first();
		if(!person) {return message.channel.send('no one was found...*boi*');}
		const role = await message.guild.roles.find(x=>x.name === 'Limuted');
		if(!role) {
			return message.channel.send('this user isn\'t muted');
		}
		if(role) {
			await person.removeRole(role);
			message.channel.send(`${person.user.tag} has been unmuted`);
		}
	})

module.exports = unmute;