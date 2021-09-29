const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('game', {
		id: {
			type: DataTypes.STRING,
			unique: true,
			primaryKey: true,
		},
		units: {
			type: DataTypes.DOUBLE,
		},
		coins: {
			type: DataTypes.DOUBLE,
		},
		sapphires: {
			type: DataTypes.DOUBLE,
		},
		upi: {
			type: DataTypes.DOUBLE,
		},
		excost: {
			type: DataTypes.DOUBLE,
		},
		nextsapphire: {
			type: DataTypes.DOUBLE,
		},
	}, {
		timestamps: false,
	});
};