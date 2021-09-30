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
const Shop = require('../../models/Shop.js')(sequelize, Sequelize.DataTypes);

const shop = require('../../shop.js');

module.exports = {
	name: 'basicinfo',
	description: `Explain basic gameplay functions of the bot, such as exchanging and what actions are`,
	async execute(message, args) {
		message.reply(`
**Increasing, Units**: Units are the main(?) resources of the bot. You can get them by increasing (\`^increase\` or \`^i\`).
**Exchanging, Coins**: Coins are one of the main resources, and are used for buying upgrades in the shop and other stuff. You can get them by exchanging units into coins (\`^exchange\` or \`^e\`).
**Sapphires**: Sapphires are rarer than Units and Coins. Unlike the 2 former resources, you don't get them by commands, but by gaining a number of units. You can sell them for some coins, and more later on.
		`);
	},
};