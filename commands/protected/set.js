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
	name: 'set',
	description: 'Set a resource to a number',
	protected: true,
	args: true,
	usage: '<resource> <number>',
	async execute(message, args) {
		if (args[1].toNumber == NaN) return message.reply('That isn\'t a valid number!');

		message.reply(`You now have.`);

		const profile = await Game.findOne({ where: { id: message.author.id } });
		thing = {};
		thing[args[0]] = args[1];
		await Game.update(thing, { where: { id: message.author.id } });
	},
};