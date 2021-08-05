/* eslint-disable no-empty-function */
/* eslint-disable no-inline-comments */

module.exports = {
	category: '',
	name: '',
	description: '',
	options: [ // command aguments
		{
			name: '',
			description: '',
			type: 3, // type of argument See more: https://discord.com/developers/docs/interactions/slash-commands#application-command-object-application-command-option-type
			required: true,
			choices: [ // choices of argument
				{
					name: '',
					value: '',
				},
				{
					name: '',
					value: '',
				},
			],
		},
	],
	userPerms: [],
	clientPerms: [],
	async run(client, interaction, args) {},
};
