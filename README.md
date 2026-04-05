# Discord-Command-Deletor
Easily delete old Discord application commands.

## Usage
1. Clone or download the repo
```
git clone https://github.com/LetUsFlow/Discord-Command-Deletor.git
```

2. Install dependencies with [Bun](https://bun.com/)
```
bun install
```

3. Configure the application by creating a .env file in the root directory of the project or add these as enviroment variables in your terminal. This file should contain the following environment variables:

- DISCORD_TOKEN: Your Discord bot token.
- CLIENT_ID: The client ID of your Discord application.

```
DISCORD_TOKEN=...
CLIENT_ID=...
```

4. Delete the reigstered commands
```sh
bun start
```
All global application commands and all guild-specific commands for every guild the bot is currently joined will be deleted. Note, that deleting the commands may take some time (several seconds or more depending on the number of registered commands).

## License
ISC
