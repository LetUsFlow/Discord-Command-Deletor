require('dotenv').config();

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

let routes;
if (guildId == undefined) {
    routes = Routes.applicationCommands(clientId);
}
else {
    routes = Routes.applicationGuildCommands(clientId, guildId);
}

const rest = new REST({ version: '9' }).setToken(token);
rest.get(routes)
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${routes}/${command.id}`;
            console.log(deleteUrl);
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
