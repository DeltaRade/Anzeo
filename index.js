const liberch = require('liberch');
const client = new liberch.Client({ prefixes:['Li', '.'], ownerID:'298258003470319616', mentionAsPrefix:true });
client.commandHandler.load('commands');
client.loadEvents('events');
client.commandHandler.on('commandError', (error)=>{
	console.log(error);
});
client.on('message', (message)=>{
	client.commandHandler.handle(message);
});
client.login(process.env.token);// process.env.token
