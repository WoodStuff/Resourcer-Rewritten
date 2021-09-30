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
	compileItem(a, levels) {
		buff = shop[a].type == 'buff';
		prefix = typeof shop[a].prefix != 'undefined';
		suffix = typeof shop[a].suffix != 'undefined';
		return { name: `**${a} - ${shop[a].name}**`, value: `
			*${shop[a].description}*
			${buff ? `Level ${levels[a]}/${shop[a].effects.length - 1}` : `${(levels[a] < 1) ? `**Not bought**` : `**Bought!**`}`}
			**Currently** ${prefix ? shop[a].prefix : ''}${shop[a].effects[parseInt(levels[a])]}${suffix ? shop[a].suffix : ''} -> ${prefix ? shop[a].prefix : ''}${shop[a].effects[parseInt(levels[a]) + 1]}${suffix ? shop[a].suffix : ''} **Next**
			${shop[a].costs[parseInt(levels[a]) + 1]}${this.emojis.coin}
		`}
	},
	hasItem(a, levels) {
		buff = shop[a].type == 'buff';
		if (!buff && levels[a] >= 1) return true;
		else if (levels[a] >= shop[a].effects.length - 1) return true;
		return false;
	},
	calcUpi(profile, levels) {
		upi = 1;
		upi = upi + shop[1].effects[parseInt(levels[1])];
		return upi;
	}
};