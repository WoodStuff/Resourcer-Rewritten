/* eslint-disable indent */
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] });
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
const commandFolders = fs.readdirSync('./commands');

const events = require('./events.js');
const bot = require('./bot.js');
const { token } = require('./token.json');
const config = require('./config.json');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('database', 'user', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

const cooldowns = new Discord.Collection();

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const Game = require('./models/Game.js')(sequelize, Sequelize.DataTypes);
const Global = require('./models/Global.js')(sequelize, Sequelize.DataTypes);

client.once('ready', async () => {
	client.user.setActivity('Resourcer Rewritten', { type: 'PLAYING' });
	console.log('hHhhHHhjbUFXSDHUFJAEYNHt7ufwrbyiewnorxnu!@4y124');
	Game.sync();
	Global.sync();
	try {
		await Global.create({
			id: config.ID,
			purplits: 0,
		})
	} catch (e) {
		if (!e.name === 'SequelizeUniqueConstraintError') { // SequelizeUniqueConstraintError is the error when id already exists sooo
			console.error(e);
			return message.reply('Something went wrong.');
		}
	}
});

// eslint-disable-next-line no-multi-spaces
betaTesters =  [/* watglan */'326729433618579456',
				/* quitin */'225621781514420225',
				/* vovka */'337921582418755585',
				/* gunnerteam */'210338284939902986',
				/* obsi */'175823518448091136',
				/* cjhay */'284926422089465856'];

client.on('messageCreate', async message => {
	try {
		await Game.create({
			id: message.author.id,
			units: 0,
			coins: 0,
			sapphires: 0,
			upi: 1,
			excost: 25,
			nextsapphire: 1000,
		})
	} catch (e) {
		if (!e.name === 'SequelizeUniqueConstraintError') { // SequelizeUniqueConstraintError is the error when id already exists sooo
			console.error(e);
			return message.reply('Something went wrong.');
		}
	}

	if (!message.content.startsWith(config.PREFIX) || message.author.bot) return;

	const args = message.content.slice(config.PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('I can\'t execute that command inside DMs!');
	}
	if (command.protected && !betaTesters.includes(message.author.id)) {
		return message.channel.send('You need to be a beta-tester to run this command!');
	}
	if (command.dangerous && !['326729433618579456'].includes(message.author.id)) {
		return message.channel.send('This command is potentially dangerous, only the owner may use it!');
	}
	if (command.args && !args.length) {
	    return message.channel.send(`You didn't provide any arguments, ${message.author}!\nIntended usage: \`${config.PREFIX}${command.name} ${command.usage}\``);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	if (!betaTesters.includes(message.author.id)) {
		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.channel.send(`Please wait \`${(timeLeft).toFixed(1)}\` more seconds before reusing the command.`);
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	}

	try {
		const result = await command.execute(message, args);
		events.doEvent(result, command, message);
	}
    catch (error) {
		console.error(error);
		message.channel.send('get erored lmao'); // eror
	}
});

client.login(token);