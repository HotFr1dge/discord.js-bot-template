module.exports = {
	category: 'informacyjne',
	name: 'ping',
	description: 'Wysyła informację o pingu bota.',
	async run(client, interaction, options) {

		interaction.reply({ content: `🏓 Pong! - ${client.ws.ping}ms` });

	},
};
