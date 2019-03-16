const { Command } = require('liberch');
let kick=new Command({name:'kick'})
kick.setExecute(message=> {
		if(!message.member.permissions.has('KICK_MEMBERS')){
			return message.reply('insufficient permissions (needs KICK_MEMBERS)')
		}
		const user = message.mentions.members.first();
		if(!user) {
			return message.channel.send('invalid user');
		}

		user.kick(`requested by ${message.author.username}`)
		.catch((e)=>{
			message.reply(e.message)
		});
	})

module.exports = kick;