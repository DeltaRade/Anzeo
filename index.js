const liberch = require('liberch');
const client = new liberch.Client({ prefixes:['Li', '.', '&'], ownerID:'298258003470319616', mentionAsPrefix:true });
client.loadCommands('commands');
client.loadEvents('events');

client.events.on('commandError', (error)=>{
	console.log(error);
});

const filewatch = new liberch.FileWatch();
filewatch.watchDir('commands');
filewatch.on('dirChanged', (event, dir, file)=>{
	console.log(event);
	if(event != 'change') {return;}
	console.log('reloading files');
	client.reloadCommand(`${dir}/${file}`);
});
client.login('NTMzNDA4OTUxNzY1ODI3NTg1.DyZ0VA.Ci8pnQ5-kCLAeBOqs9ZN6ocI_QM');// process.env.token