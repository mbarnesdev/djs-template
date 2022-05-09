const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
    name: 'ready',
    once: true,
    run: (client, commands) => {
        console.log(`${client.user.tag} is online.`);

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                await rest.put(
                    Routes.applicationGuildCommands(
                        client.user.id,
                        process.env.GUILD_ID
                    ),
                    {
                        body: commands,
                    }
                );
                console.log('Registered (/) commands locally.');
            } catch (err) {
                if (err) {
                    console.error(err);
                }
            }
        })();
    },
};
