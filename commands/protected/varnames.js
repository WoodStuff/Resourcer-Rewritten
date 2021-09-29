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
	name: 'varnames',
	description: `List the variable names for ${config.PREFIX}set`,
	protected: true,
	async execute(message, args) {
		const varEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Varnames')
		.setDescription(`
		**units:** Units
		**coins:** Coins
		**sapphires:** Sapphires
		**upi:** UPI
		**excost:** Cost for coin exchange
		**nextsapphire:** Units required for next sapphire`)
		.setTimestamp()
		.setFooter(`Requested by ${message.author.username}`, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`);
		message.reply({ embeds: [varEmbed] });
	},
};