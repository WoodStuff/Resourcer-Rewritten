/* eslint-disable indent */
const config = require('../../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'Get the bot\'s commands, or display a command\'s information.',
	aliases: ['commands', 'cmds', 'helpme'],
	usage: '[command]',
	cooldown: 10,
	async execute(message, args) {
		const { commands } = message.client;
		if (!args.length) {
			const helpEmbed = new Discord.MessageEmbed()
    	    .setColor('#0099ff')
	        .setTitle('Help')
    	    .setThumbnail('https://cdn.discordapp.com/attachments/755447900481388644/892450534756319232/help_command.png')
	        .addFields(//**${config.PREFIX}botstats** - View the bot's stats.
    	    	{ name: 'Meta',	value: `**${config.PREFIX}help** - List all commands.
										**${config.PREFIX}egg** - eg!!g` },
				{ name: 'Simple',  value:  `**${config.PREFIX}stats** - View your stats.
											**${config.PREFIX}increase** - Gain some units.
											**${config.PREFIX}exchange** - Exchange units for coins.
											**${config.PREFIX}shop** - View the shop.` },
				{ name: 'Info',	value: `**${config.PREFIX}basicinfo** - Explain all the basic gameplay functions of the bot.` },
			)
        	.setTimestamp()
	        .setFooter(`Requested by ${message.author.username}`, message.author.iconURL);

			return message.reply({ embeds: [helpEmbed] });
		}
		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('That\'s command  command! is does not exist.');
		}

		var data = [];
		data.push(command.description);

		if (command.cooldown == 1) {
			data.push(`**Cooldown:** 1 second`);
		} else if (!(command.cooldown == undefined)) {
			data.push(`**Cooldown:** ${command.cooldown} seconds`);
		}

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.usage) data.push(`**Usage:** ${command.usage}`);
		if (command.guildOnly) data.push(`**Server-only!**`);
		if (command.protected || command.dangerous) data.push(`**Protected!**`);

		data = data.join('\n');

		const helpEmbed = new Discord.MessageEmbed()
    	.setColor('#0099ff')
	    .setTitle(command.name)
		.setDescription(data)
	    .setThumbnail('https://media.discordapp.net/attachments/717092144631775245/832970673345134592/Question_Cylinder.png')
       	.setTimestamp()
		.setFooter(`Requested by ${message.author.username}`, message.guild.iconURL());

		return message.reply({ embeds: [helpEmbed] });
	},
};