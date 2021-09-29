const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('global', {
		id: {
			type: DataTypes.STRING,
			unique: true,
			primaryKey: true,
		},
		purplits: {
			type: DataTypes.DOUBLE,
		},
	}, {
		timestamps: false,
	});
};