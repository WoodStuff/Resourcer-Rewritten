const { locations } = require('../../bot.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const Game = require('../../models/Game.js')(sequelize, Sequelize.DataTypes);

module.exports = {
	name: 'location',
	description: 'Get your current location',
	async execute(message, args) {
		const profile = await Game.findOne({ where: { id: message.author.id } });
		message.reply(`${locations[profile.location]}`);
	},
};