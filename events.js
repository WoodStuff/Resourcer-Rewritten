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
const Shop = require('./models/Shop.js')(sequelize, Sequelize.DataTypes);

module.exports = {
	async doEvent(result, command, message) {
		this.any(message);
		if (command.action && result === true) {
			this.action();
		}
	},
	async any(message) {
		const profile = await Game.findOne({ where: { id: message.author.id } });
		const levels = JSON.parse(JSON.stringify(await Shop.findOne({ where: { id: message.author.id } }))).levels.toString().split(',');
		
		// sapphires
		if (profile.nextsapphire == 0) {
			await Game.update({ nextsapphire: 1000 * (profile.sapphires + 2) }, { where: { id: message.author.id } });
			await Game.update({ sapphires: profile.sapphires + 1 }, { where: { id: message.author.id } });
			message.reply('You\'ve earned a sapphire!');
		}

		// calculate upi
		if (profile.upi != bot.calcUpi(profile, levels)) await Game.update({ upi: bot.calcUpi(profile, levels) }, { where: { id: message.author.id } });
	},
	async action() {
		console.log('action received');
	},
};