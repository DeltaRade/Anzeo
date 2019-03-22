const liberch = require('liberch');
let sautorole=new liberch.Command({ name:'setautorole', alias:['setarole'] })
sautorole.setExecute(async (message, args)=> {
		
		if(!message.member.permissions.has('MANAGE_GUILD')){
			return message.reply('insufficient permissions (needs MANAGE_GUILD)')
		}
		const role = message.guild.roles.find(x=>x.name.toLowerCase() == args[0].toLowerCase()) || message.guild.roles.get(args[0]);
		if(!role) {
			return message.channel.send('invalid role name or role id');
		}
		const sql = new liberch.PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		await sql.upsert('settings', ['guild', 'autorolerole'], [message.guild.id, role.id], 'guild', 'autorolerole', role.id);
		await sql.end();
		message.channel.send(`set autorole role to: \`\`${role.name}\`\``);
	})
module.exports = sautorole;