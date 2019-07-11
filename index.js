const liberch = require('liberch');
require('dotenv').config()
const client = new liberch.Client({ prefix:'.', ownerID:'298258003470319616' });
client.loadEvents('events');
client.commandHandler.on('commandError', (error)=>{
	console.log(error);
});
client.setSettings(new liberch.JSONSettingsDB())
const filewatch = new liberch.FileWatch();
filewatch.watchDir('commands');
filewatch.on('dirChanged', (event, dir, file)=>{
	console.log(event);
	if(event != 'change') {return;}
	console.log('reloading files');
	client.reloadCommands();
});
client.login(process.env.token);// process.env.token