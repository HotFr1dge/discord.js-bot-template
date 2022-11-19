const { EmbedBuilder } = require('discord.js');
const { createErrEmbed } = require('../../functions.js');

module.exports = {
	category: 'informacyjne',
	name: 'commands',
	description: 'Wysyła wiadomość ze wszystkimi komendami bota',
	options: [
		{
			name: 'command_name',
			description: 'Szczegółowe informacje o komendzie',
			type: 3,
			required: false,
		},
	],
	async run(client, interaction, options) {

		if (!options[0]) {
			getAll(client, interaction);
		}
		else {
			getCMD(client, interaction, options[0].value);
		}

	},
};

async function getCMD(client, interaction, input) {

	const embedCmd = new EmbedBuilder();
	let info = `❌ Nie znaleziono informacji o komendzie \`${input}\``;

	if (!client.commands.has(input)) {
		return interaction.reply({
			embeds: [createErrEmbed(info)],
			ephemeral: true,
		});
	}

	const cmd = client.commands.get(input);

	if (cmd.name) info = `Nazwa komendy: \`${cmd.name}\``;
	if (cmd.description) info += `\nOpis: \`${cmd.description}\``;

	if (cmd.options) {
		const formatedoptions = [];
		cmd.options.forEach(y => {
			if (!y.required) { formatedoptions.push(`[${y.name}]`); }
			else { formatedoptions.push(`<${y.name}>`); }
		});
		info += `\nArgumenty: \`${formatedoptions.join(' ')}\``;
		embedCmd.setFooter('Składnia: <> = wymagane, [] = opcjonalne');
	}

	if (cmd.userPerms) info += `\nWymagane uprawnienia: ${cmd.userPerms.map(a => `\`${a}\``).join(', ')}`;

	embedCmd.setDescription(info).setColor(`0x${Math.floor(Math.random()*16777215).toString(16)}`);
	interaction.reply({ embeds: [embedCmd] });
}

function getAll(client, interaction) {
	// Define the help embed
	const embed = new EmbedBuilder()
		.setAuthor({ name: 'WSZYSTKIE KOMENDY', iconURL: 'https://cdn.discordapp.com/attachments/825035469711736852/825041736262352986/get-help-48.png'})
		.setColor(process.env.INFO_BLUE)
		.setThumbnail(client.user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 }));

	// Filter all of the categories
	const categories = [...new Set(client.commands.map(x => x.category))]
		.filter(x => x)
		.map(x => x.toLowerCase());

	// Function to get all the command under a category
	const commands = category => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => `\`${cmd.name}\``)
			.join(', ');
	};

	
	// Add commands for category field
	let fields = []
	for (let i = 0; i < categories.length; i++) {
		fields.push({ name: `${categories[i][0].toUpperCase() + categories[i].slice(1)}`, value: `${commands(categories[i])}`});
	}
	embed.addFields(fields);

	// Send the help embed
	return interaction.reply({ embeds: [embed] });
}