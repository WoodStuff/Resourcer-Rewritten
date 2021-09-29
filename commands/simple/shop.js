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

const shop = require('../../shop.js');

module.exports = {
	name: 'shop',
	description: 'View the shop, and buy some stuff',
	async execute(message, args) {
		const profile = await Game.findOne({ where: { 'id': message.author.id } });
		const statsEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Statisthick')
		.setThumbnail(`https://cdn.discordapp.com/attachments/755447900481388644/892450536434069504/stats_command.png`)
		.addFields(
		)
		.setTimestamp()
		.setFooter(`Buy using \`${config.PREFIX}buy <id>\``, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`);
		message.reply({ embeds: [statsEmbed] });
	},
};