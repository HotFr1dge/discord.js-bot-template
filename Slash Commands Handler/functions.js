const { EmbedBuilder } = require('discord.js');

module.exports = {

	createErrEmbed: async function(err) {
		return new EmbedBuilder({ color: 0xFF000, description: err });
	},

};