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
	name: 'exchange',
	description: 'Exchange units into coins',
	aliases: ['e'],
	action: true,
	async execute(message, args) {
		const profile = await Game.findOne({ where: { id: message.author.id } });
		if (profile.units < profile.excost) return message.reply(`You don't have enough units.`);

		message.reply(`You have converted unit to coin.`);
		await Game.update({ units: profile.units - profile.excost }, { where: { id: message.author.id } });
		await Game.update({ coins: profile.coins + 1 }, { where: { id: message.author.id } });

		return true;
	},
};