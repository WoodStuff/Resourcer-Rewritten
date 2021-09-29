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
};