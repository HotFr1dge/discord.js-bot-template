module.exports = {
	run(client) {
		console.log('Bot is Ready!');

		// Send commands data to Discord API
		const { REST } = require('@discordjs/rest');
		const { Routes } = require('discord-api-types/v9');

		const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

		(async () => {
			try {
				console.log('Started refreshing application (/) commands.');

				await rest.put(
					Routes.applicationCommands(client.application.id),
					{ body: client.commands },
				);

				console.log('Successfully reloaded application (/) commands.');
			}
			catch (error) {
				console.error(error);
			}
		})();

		// for tests
		client.api.applications(client.user.id).commands.get().then(console.log);

	},
};
