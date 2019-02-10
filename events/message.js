const { Utils } = require('liberch');
module.exports = (client, message)=>{
	if(message.contains('discord.gg')) {
		message.delete();
	}
};