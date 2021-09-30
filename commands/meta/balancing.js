const config = require('../../config.json');

module.exports = {
	name: 'balancing',
	description: 'Check to how late in the game is balanced. If you are after this, it\'s probably a good idea to stop until later',
	execute(message, args) {
		message.reply(`The game is currently balanced up to ${config.BALANCING}`);
	},
};