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

process.on('unhandledRejection', (err)=>{
	console.error(err);
	if (err.name == 'DiscordAPIError' && err.message == '401: Unauthorized') return process.exit();
	(client.channels.get('0') || client.channels.get('544148815746433024')).send(`
\`\`\`xs
Error: ${err.name}
    ${err.message}
    ${err.stack}
    \`\`\`
    `);
});
client.login(process.env.token);// process.env.token