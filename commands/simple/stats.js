const Discord = require('discord.js');

const bot = require('../../bot.js');
const config = require('../../config.json');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Game = require('../../models/Game.js')(sequelize, Sequelize.DataTypes);

module.exports = {
	name: 'stats',
	description: 'View the stats',
	async execute(message, args) {
		const profile = await Game.findOne({ where: { 'id': message.author.id } });
		const statsEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Statisthick')
		.setThumbnail(`https://cdn.discordapp.com/attachments/755447900481388644/892450536434069504/stats_command.png`)
		.addFields(
			{ name: 'Resources', value: `
				${bot.emojis.unit} Units: ${profile.units}
				${bot.emojis.coin} Coins: ${profile.coins}
				${bot.emojis.sapphire} Sapphires: ${profile.sapphires}`
			},
			{ name: 'Stuff', value: `
				${bot.emojis.upi} UPI: ${profile.upi}
				${bot.emojis.coin} Exchange Cost: ${profile.excost}
				${bot.emojis.sapphire} To Next Sapphire: ${profile.nextsapphire}`
			},
		)
		.setTimestamp()
		.setFooter(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`);
		message.reply({ embeds: [statsEmbed] });
	},
};