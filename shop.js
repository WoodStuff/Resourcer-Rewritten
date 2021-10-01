const Discord = require('discord.js');

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

module.exports = [
	{
		id: 0,
		name: 'Unit Inflation',
		description: 'Decreases the cost of exchanging to coins',
		type: 'buff',
		unlocked() { return true },
		effects: [25, 20, 18, 15, 12, 10, 8, 6, 5,  4,  3,  2,   1],
		costs:   [0,  1,  2,  2,  3,  3,  4, 5, 10, 15, 25, 100, 1500],
		async onPurchase(id) {
			const profile = await Game.findOne({ where: { id: id } });
			const levels = JSON.parse(JSON.stringify(await Shop.findOne({ where: { id: id } }))).levels.toString().split(',');

			await Game.update({ excost: this.effects[levels[this.id]] }, { where: { id: id } });
		},
	},
	{
		id: 1,
		name: 'More Units',
		description: 'Gives more UPI, or more units per increase',
		type: 'buff',
		prefix: '+',
		unlocked() { return true },
		effects: [0, 1, 2, 3, 4, 5],
		costs:   [0, 2, 3, 4, 5, 10],
		async onPurchase(id) { },
	},
];