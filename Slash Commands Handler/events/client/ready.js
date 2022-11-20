module.exports = {
	run(client) {
		console.log('Bot is Ready!');

		// Send commands data to Discord API
		const { REST, Routes } = require('discord.js');

		const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

		const commandsToSend = eval(JSON.stringify(client.commands));

		commandsToSend.forEach(x => {
			delete x.category;
			delete x.userPerms;
			delete x.clientPerms;
		});

		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationCommands(client.application.id),
					{ body: commandsToSend },
				);

				console.log('\x1b[32m', 'Successfully reloaded application (/) commands.', '\x1b[0m');
			}
			catch (error) {
				console.error(error);
			}
		})();

		// for tests - Prints list of registered commands
		client.application.commands.fetch().then(res => console.log('\x1b[34m', `Registered commands: ${res.map(x => x.name).join(', ')}`, '\x1b[0m'));

	},
};
