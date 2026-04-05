import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v10';
import type {
    RESTGetAPIApplicationCommandsResult,
    RESTGetAPICurrentUserGuildsResult,
} from 'discord-api-types/v10';

const requireEnv = (name: string): string => {
    const value = process.env[name];
    if (!value || value.trim() === '') {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
};

const token = requireEnv('DISCORD_TOKEN');
const clientId = requireEnv('CLIENT_ID');

const rest = new REST().setToken(token);

type DiscordRoute = `/${string}`;

const deleteCommands = async (
    label: string,
    listRoute: DiscordRoute,
    deleteRouteForId: (commandId: string) => DiscordRoute,
) => {
    const data = await rest.get(listRoute);
    const commands = data as RESTGetAPIApplicationCommandsResult;

    if (commands.length === 0) {
        console.log(`${label}: no commands to delete.`);
        return;
    }

    console.log(`${label}: deleting ${commands.length} command(s)...`);
    const promises = [];

    for (const command of commands) {
        const deleteRoute = deleteRouteForId(command.id);
        promises.push(rest.delete(deleteRoute));
    }

    await Promise.all(promises);
    console.log(`${label}: done.`);
};

const run = async () => {
    console.log('Deleting global application commands...');
    await deleteCommands(
        'Global',
        Routes.applicationCommands(clientId),
        commandId => Routes.applicationCommand(clientId, commandId),
    );

    const guilds = (await rest.get(
        Routes.userGuilds(),
    )) as RESTGetAPICurrentUserGuildsResult;

    console.log(`Found ${guilds.length} guild(s).`);
    for (const guild of guilds) {
        const label = `Guild ${guild.name ?? guild.id}`;
        await deleteCommands(
            label,
            Routes.applicationGuildCommands(clientId, guild.id),
            commandId => Routes.applicationGuildCommand(clientId, guild.id, commandId),
        );
    }
};

run().catch(error => {
    console.error('Failed to delete commands:', error);
    process.exitCode = 1;
});
