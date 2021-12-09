const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('unlockables', {
		id: {
			type: DataTypes.STRING,
			unique: true,
			primaryKey: true,
		},
		dice: {
			type: DataTypes.STRING,
		},
	}, {
		timestamps: false,
	});
};