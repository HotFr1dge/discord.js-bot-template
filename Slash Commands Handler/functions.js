const { MessageEmbed } = require('discord.js');

module.exports = {

	createErrEmbed: async function(err) {
		return new MessageEmbed({ color: '#FF0000', description: err });
	},

};
