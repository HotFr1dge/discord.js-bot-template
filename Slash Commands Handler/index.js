// Get properties from .env file and add to the envirnment
require('dotenv').config();

// Intantiate a discord.Client
const { Client, Collection } = require('discord.js');
const client = new Client({
	allowedMentions: {
		parse: ['users', 'roles'],
		repliedUser: false,
	},
	intents: ['GUILD_MESSAGES', 'GUILDS'],
});

// Load the command and events
['commands'].forEach(x => (client[x] = new Collection()));
['command', 'event'].forEach(x => require(`./handlers/${x}`)(client));

// Login the client
client.login(process.env.TOKEN);
