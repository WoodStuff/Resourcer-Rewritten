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
const { hasItem } = require('../../bot.js');

module.exports = {
	name: 'buy',
	description: `Buy an upgrade from the \`${config.PREFIX}shop\``,
	args: true,
	usage: '<upgrade id>',
	action: true,
	async execute(message, args) {
		const profile = await Game.findOne({ where: { id: message.author.id } });
		const levels = bot.clear(await Shop.findOne({ where: { id: message.author.id } })).levels.toString().split(',');

		item = parseInt(args[0]);

		cost = shop[item].costs[parseInt(levels[item]) + 1];

		if (isNaN(item) || shop[item] == undefined) return message.reply('That upgrade doesn\'t exist!');

		if (!shop[item].unlocked()) return message.reply('You haven\'t unlocked this upgrade yet!');
		if (hasItem(item, levels)) return message.reply(`You've already ${(shop[item].type == 'buff') ? 'maxed' : 'bought'} this upgrade!`);

		if (profile.coins < cost) return message.reply('You don\'t have the required coins for this upgrade!');

		levels[item] = parseInt(levels[item]) + 1;

		await Game.update({ coins: profile.coins - cost }, { where: { id: message.author.id } });
		await Shop.update({ levels: levels }, { where: { id: message.author.id } });

		message.reply(`You've bought **${shop[item].name}**!`);
		shop[item].onPurchase(message.author.id);

		return true;
	},
};