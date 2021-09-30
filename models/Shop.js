const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('shops', {
		id: {
			type: DataTypes.STRING,
			unique: true,
			primaryKey: true,
		},
		levels: {
			type: DataTypes.ARRAY(DataTypes.DOUBLE),
		},
	}, {
		timestamps: false,
	});
};