# Discord-Command-Deletor
Easily delete old Discord application commands.

## Usage
1. Clone or download the repo
```
git clone https://github.com/LetUsFlow/Discord-Command-Deletor.git
```
2. Install dependencies with your favourite Node package manager
```
bun install
npm install
yarn install
```
3. Configure the application by creating a .env file in the root directory of the project or add these as enviroment variables in your terminal. This file should contain the following environment variables:

- DISCORD_TOKEN: Your Discord bot token.
- CLIENT_ID: The client ID of your Discord application.
- GUILD_ID: The ID of the Discord guild (server) where commands will be deleted.

```
DISCORD_TOKEN=...
CLIENT_ID=...
GUILD_ID=
```
If `GUILD_ID` is not set, the tool will only delete global application commands. If set, only guild-specific application commands will be deleted.

## License
ISC
