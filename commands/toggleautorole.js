const liberch = require('liberch');
let autorole=new liberch.Command({ name:'toggleautorole', alias:['tarole'] })
autorole.setExecute(async (message, args)=> {
		
		if(!message.member.permissions.has('MANAGE_GUILD')){
			return message.reply('insufficient permissions (needs MANAGE_GUILD)')
		}
		const sql = new liberch.PostgreSQL({
			connectionString:process.env.DATABASE_URL,
			ssl:true,
		});
		await sql.connect();
		let isenabled = await sql.get('settings', 'guild', message.guild.id);
		isenabled = isenabled.rows[0];
		if(!isenabled || !isenabled.autoroleenabled || isenabled.autoroleenabled === 'false') {
			await sql.upsert('settings', ['guild', 'autoroleenabled'], [message.guild.id, true], 'guild', 'autoroleenabled', true);
			message.channel.send('autorole enabled');
		}
		else{
			await sql.upsert('settings', ['guild', 'autoroleenabled'], [message.guild.id, 'false'], 'guild', 'autoroleenabled', false);
			message.channel.send('autorole disabled');
		}

		await sql.end();
	})


module.exports = autorole;