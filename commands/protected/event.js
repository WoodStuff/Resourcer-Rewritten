const Discord = require('discord.js');

const bot = require('../../bot.js');
const config = require('../../config.json');

const Sequelize = require('sequelize');
const events = require('../../events.js');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Game = require('../../models/Game.js')(sequelize, Sequelize.DataTypes);

module.exports = {
	name: 'event',
	description: 'Trigger an event',
	protected: true,
	args: true,
	usage: '<event>',
	async execute(message, args) {
		if (events[args[0]] == undefined) return message.reply('Invalid event!');
		events[args[0]]();
	},
};