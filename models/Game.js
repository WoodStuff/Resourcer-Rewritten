const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('games', {
		id: {
			type: DataTypes.STRING,
			unique: true,
			primaryKey: true,
		},
		units: {
			type: DataTypes.BIGINT,
		},
		coins: {
			type: DataTypes.BIGINT,
		},
		sapphires: {
			type: DataTypes.BIGINT,
		},
		upi: {
			type: DataTypes.BIGINT,
		},
		excost: {
			type: DataTypes.BIGINT,
		},
		nextsapphire: {
			type: DataTypes.BIGINT,
		},
		location: {
			type: DataTypes.BIGINT,
		},
	}, {
		timestamps: false,
	});
};