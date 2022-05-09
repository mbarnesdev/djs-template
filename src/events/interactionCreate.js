module.exports = {
    name: 'interactionCreate',
    once: false,
    run: async (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }
        const command = interaction.client.commands.get(
            interaction.commandName
        );
        if (!command) {
            return;
        }
        try {
            await command.run(interaction);
        } catch (err) {
            if (err) {
                console.error(err);
            }
            await interaction.reply({
                content: 'An error occured executing that command.',
                ephemeral: true,
            });
        }
    },
};
