const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('testcmd')
        .setDescription('Testing command.')
        .addStringOption((option) =>
            option
                .setName('exampleoption')
                .setDescription('Example string option.')
                .setRequired(false)
        ),
    run: async (interaction) => {
        const exampleOpt = interaction.options.getString('exampleoption');
        await interaction.reply(`${exampleOpt} - example command reply.`);
    },
};
