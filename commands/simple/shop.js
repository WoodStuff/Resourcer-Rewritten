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
	name: 'shop',
	description: 'View the shop, and buy some stuff',
	async execute(message, args) {
		const profile = await Game.findOne({ where: { 'id': message.author.id } });
		const levels = bot.clear(await Shop.findOne({ where: { 'id': message.author.id } })).levels.toString().split(',');

		var itemsCollected = 0;
		var items = [];
		
		for (const item of shop) {
			if (item.unlocked() && !bot.hasItem(item.id, levels)) {
				itemsCollected++;
				items.push(item.id);
			}
			if (itemsCollected > 4) break;
		}

		const thumbnail = (itemsCollected == 0)
		? 'https://media.discordapp.net/attachments/755447900481388644/893143103031115817/shop_empty.png'
		: 'https://media.discordapp.net/attachments/755447900481388644/893143101672132629/shop_command.png'

		const statsEmbed = new Discord.MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Shop')
		.setThumbnail(thumbnail)
		.setTimestamp()
		.setFooter(`Buy using ${config.PREFIX}buy <id>`, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`);

		if (itemsCollected > 0) statsEmbed.addFields(bot.compileItem(items[0], levels));
		if (itemsCollected > 1) statsEmbed.addFields(bot.compileItem(items[1], levels));
		if (itemsCollected > 2) statsEmbed.addFields(bot.compileItem(items[2], levels));
		if (itemsCollected > 3) statsEmbed.addFields(bot.compileItem(items[3], levels));
		if (itemsCollected > 4) statsEmbed.addFields(bot.compileItem(items[4], levels));

		if (itemsCollected == 0) statsEmbed.addField('**No Items**', `You've bought all possible items! The last item ID is ${shop.length - 1}, so if you've bought that, then you're probably near the endgame.`);

		message.reply({ embeds: [statsEmbed] });
	},
};