const { Command } = require('liberch');
const { RichEmbed } = require('discord.js');
const fs = require('fs');// FFB766

class Help extends Command {
	constructor() {
		super({ name:'help' });
	}

	execute(client, message) {
		const hlp = {};
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {

			const command = require(`./${file}`);
			const cmd = new command();
			console.log(cmd);
			let i = '';
			if(cmd.alias) {
				i = i + ' | ' + cmd.alias.join(' ');
			}
			if(cmd.description) {
				hlp[`${cmd.name}${i}`] = cmd.description;
			}
			else{
				hlp[`${cmd.name}${i}`] = 'no descrption';
			}
			// message.client.commands.delete(command.name)


		}
		const ed = new RichEmbed()
			.setColor('FFB766');

		for(const i in hlp) {
			ed.addField(i, hlp[i], false);
		}
		ed.setFooter('help section');

		message.channel.send(ed);


	}
}

module.exports = Help;