# erlc-wrapper

Node.js wrapper for the ER:LC (Emergency Response: Liberty County) Private Server API.

## Features
- Fetch server status, player list, and vehicle list
- Run commands on the ER:LC server
- Optional in-memory caching for API responses

## Installation

```bash
npm install erlc-wrapper
```

## Usage

```js
import { ERLCClient } from 'erlc-wrapper';

const client = new ERLCClient({
  serverKey: 'YOUR_ERLC_SERVER_KEY',
  cacheTTL: 60000 // Optional: cache time-to-live in ms (default: 0, disables cache)
});

// Get server status
const status = await client.getServerStatus();

// Get list of players
const players = await client.getPlayers();

// Get list of vehicles
const vehicles = await client.getVehicles();

// Run a command
const response = await client.runCommand('announce Hello, world!');
```

## API

### `ERLCClient(options)`
- `serverKey` (string, required): Your ER:LC server API key.
- `cacheTTL` (number, optional): Cache time-to-live in milliseconds. Set to 0 to disable caching.

### Methods
- `getServerStatus()`: Returns the current server status.
- `getPlayers()`: Returns the list of players in the server.
- `getVehicles()`: Returns all in game vehicles in the server.
- `runCommand(commandText)`: Runs a command to your server.

## Caching
If `cacheTTL` is set to a value greater than 0, responses for status, players, and vehicles will be cached in memory for the specified time set.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT
