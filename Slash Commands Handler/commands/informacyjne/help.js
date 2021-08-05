const { MessageEmbed } = require('discord.js');

module.exports = {
	category: 'informacyjne',
	name: 'help',
	description: 'Wysyła wiadomość z pomocymi informacjami',
	async run(client, interaction, args) {

		const embed = new MessageEmbed()
			.setAuthor(`${client.user.username} - POMOC`, client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }))
			.setColor(process.env.FLUENT_RED)
			.setDescription(`
				Aby zobaczyć listę wszystkich kommend użyj \`/commands\`\n
				Coś nie działa? Zgłoś to nam na [serwerze wsparcia](https://discord.gg/xxxxx)!\n
				Chcesz dodać bota na swój serwer? Trzymaj [link](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)!
			`);

		interaction.reply({ embeds: [embed] });

	},
};