const Discord = require('discord.js');

const bot = require('./bot.js');
const config = require('./config.json');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Game = require('./models/Game.js')(sequelize, Sequelize.DataTypes);

module.exports = {
	0: {
		name: 'Unit Inflator',
		description: 'Decreases the cost of exchanging to coins',
		type: 'buff',
		unlocked() { return true },
		effects: [25, 20, 18, 15, 12, 10, 8, 6, 5,  4,  3,  2,   1],
		costs:   [0,  1,  2,  2,  3,  3,  4, 5, 10, 15, 25, 100, 1500],
	},
};