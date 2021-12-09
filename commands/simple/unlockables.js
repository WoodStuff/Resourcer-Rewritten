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
const Unl = require('../../models/Unlockables.js')(sequelize, Sequelize.DataTypes);

const shop = require('../../shop.js');

module.exports = {
	name: 'unlockables',
	description: 'View all your unlockables',
	aliases: ['unl'],
	async execute(message, args) {
		const unl = bot.clear(await Unl.findOne({ where: { id: message.author.id } }));

		console.log(bot.getUnl(unl, 'dice'));
		unlocks = [];
		for (const key in unl) {
			if (Object.hasOwnProperty.call(unl, key)) {
				const element = unl[key];
				if (JSON.parse(element).unlocked) unlocks.push(key);
			}
		}

		message.reply(`You have the following unlockables: ${unlocks}`);
	},
};