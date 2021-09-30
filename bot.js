const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});
const Game = require('./models/Game.js')(sequelize, Sequelize.DataTypes);
const Global = require('./models/Global.js')(sequelize, Sequelize.DataTypes);
const Shop = require('./models/Shop.js')(sequelize, Sequelize.DataTypes);

const shop = require('./shop.js');

module.exports = {
	emojis: {
		unit: '<:unit:746756683170185216>',
		coin: '<:coin:746756695513890898>',
		sapphire: '<:sapphire:746756704162807928>',
		purplit: '<:purplit:892434668023062640>',
		upi: '<:upi:746756712056356975>',
		level: '<:level:833717869044957294>',
		heads: '<:heads:835062502437027840>',
		tails: '<:tails:835062503662288936>',
	},
	clear(a) {
		return JSON.parse(JSON.stringify(a));
	},
	async compileItem(a, levels) {
		const profile = await Game.findOne({ where: { 'id': message.author.id } });

		buff = shop[a].type == 'buff';
		return { name: `**${a} - ${shop[a].name}**`, value: `
			*${shop[a].description}*
			${buff ? `${levels[a]}/${shop[a].effects.length - 1}` : `${(levels[a] < 1) ? `**Not bought**` : `**Bought!**`}`}
			${shop[a].effects[levels[a]]} -> ${shop[a].effects[levels[a] + 1]}
		`}
	},
};