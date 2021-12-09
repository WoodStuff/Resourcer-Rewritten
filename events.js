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
const Unl = require('./models/Unlockables.js')(sequelize, Sequelize.DataTypes);

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
		const unl = bot.clear(await Unl.findOne({ where: { id: message.author.id } }));
		
		// sapphires
		if (profile.nextsapphire == 0) {
			await Game.update({ nextsapphire: 1000 * (profile.sapphires + 2) }, { where: { id: message.author.id } });
			await Game.update({ sapphires: profile.sapphires + 1 }, { where: { id: message.author.id } });
			message.reply('You\'ve earned a sapphire!');
		}

		// unlock unlockables
		if (true) {
			if (profile.units > 9 && !bot.getUnl(unl, 'dice').unlocked) {
				final = bot.getUnl(unl, 'dice');
				final.unlocked = true;
				await Unl.update({ dice: JSON.stringify(final) }, { where: { id: message.author.id } });
				message.reply(`While you were busy searching for units, a small, glowing dice falls on your head. After some seconds of a headache or something,

You've found your first unlockable, the Dice! It multiplies your UPI based on RNG. Do \`^unl dice\` to check it out.`)
			}
		}

		// calculate upi
		if (profile.upi != bot.calcUpi(profile, levels)) await Game.update({ upi: bot.calcUpi(profile, levels) }, { where: { id: message.author.id } });
	},
	async action() {
		console.log('action received');
	},
};