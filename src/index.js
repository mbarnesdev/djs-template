require('dotenv').config();
const { Client, Intents, Collection } = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_PRESENCES,
    ],
});

const init = () => {
    client.commands = new Collection();
    const commands = [];
    const commandFiles = fs
        .readdirSync(`${__dirname}/commands`)
        .filter((file) => file.endsWith('.js'));
    commandFiles.forEach((commandFile) => {
        const command = require(`./commands/${commandFile}`);
        commands.push(command.data.toJSON());
        client.commands.set(command.data.name, command);
    });

    const eventFiles = fs
        .readdirSync(`${__dirname}/events`)
        .filter((file) => file.endsWith('.js'));
    eventFiles.forEach((eventFile) => {
        const event = require(`./events/${eventFile}`);
        event.once
            ? client.once(event.name, (...args) => event.run(...args, commands))
            : client.on(event.name, (...args) => event.run(...args, commands));
    });

    mongoose
        .connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(console.log('Database connection successful.'));
};

init();

client.login(process.env.TOKEN);
