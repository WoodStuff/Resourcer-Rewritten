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
	name: 'increase',
	description: 'Gain some units',
	aliases: ['i'],
	action: true,
	async execute(message, args) {
		const profile = await Game.findOne({ where: { id: message.author.id } });
		message.reply(`You now have ${profile.units + profile.upi} units.`);
		await Game.update({ units: profile.units + profile.upi }, { where: { id: message.author.id } });
		
		// sapphires
		await Game.update({ nextsapphire: Math.max(profile.nextsapphire - profile.upi, 0) }, { where: { id: message.author.id } });

		return true;
	},
};