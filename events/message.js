const { Utils } = require('liberch');
module.exports = (client, message)=>{
	if(message.content.includes('discord.gg')) {
		message.delete();
	}
};