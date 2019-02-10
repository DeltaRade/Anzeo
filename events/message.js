const { Utils } = require('liberch');
module.exports = (client, message)=>{
	if(message.content.contains('discord.gg')) {
		message.delete();
	}
};