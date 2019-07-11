module.exports = (client, message)=>{
	if(message.content.includes('discord.gg')) {
		message.delete();
	}
	client.commandHandler.handle(client,message)
};