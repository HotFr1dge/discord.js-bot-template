const { createErrEmbed } = require('../../functions.js');

module.exports = {
	async run(client, interaction) {

		if (!interaction.isCommand()) return;
		if (!interaction.inGuild()) return;

		const cmd = interaction.commandName.toLowerCase();
		const command = client.commands.get(cmd);
		const options = interaction.options.data;

		if (command && command.run) {

			// Check the client's permissions
			if (command.clientPerms && !command.clientPerms.every(x => interaction.guild.me.permissions.has(x))) {
				return interaction
					.reply({
						embeds: [
							createErrEmbed(`❌ I am missing one of the following permissions: \`${command.clientPerms.join(', ')}\``),
						],
						ephemeral: true,
					});
			}

			// Check the authors permissions
			if (command.userPerms && !command.userPerms.every(x => interaction.member.permissions.has(x))) {
				return interaction
					.reply({
						embeds: [
							createErrEmbed(`❌ You are missing one of the following permissions: \`${command.userPerms.join(', ')}\``),
						],
						ephemeral: true,
					});
			}

			// Run the file
			command.run(client, interaction, options);
		}


	},
};