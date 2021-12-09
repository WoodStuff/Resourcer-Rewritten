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
	name: 'eval',
	description: 'Trigger an eval() script',
	dangerous: true,
	args: true,
	usage: '<thing>',
	async execute(message, args) {
		try {
			if (args.join(' ').includes('token')) return message.channel.send('nice try :)');
		    eval(args.join(' '));
		} catch (error) {
			message.channel.send('get erored lmao\n' + error);
		}
	},
};