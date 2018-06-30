# RChain bounties network API

## Description
A new general API for the RChain bounties platform. This allows anyone to create an interface for the RChain bounties platform.

## Project status

This project is divided in 2 stages:

1. Read only API that uses the existing [rewards.rchain.coop](https://rewards.rchain.coop) database as source.
2. Read and write API where features like voting and the trust metric are implemented.

As of this moment in time the first stage is being developed.

## Getting Started

Follow these steps to get started:

1. Clone the repo with `git clone https://github.com/th3build/rchain-bounties-api.git`
2. Go to the root of the directory `cd rchain-bounties-api`
3. Install the dependencies `npm install`
4. Run a local database with [this SQL file](https://rewards.rchain.coop/db-bak/2018-06-27.sql.gz) as source
5. Change the URL of the database in .env to the location your local database is located
6. Start the local server: `PORT=3000 npm start` (the port can be any port you like)

You can now send requests to `localhost:3000`. Keep the terminal command running in the background, and you can start developing.

## Implementation details

* The Node.js framework used for HTTP requests is [`hapi.js`](https://hapijs.com/).

## Tips

* Check the `npm start` output for any errors.

## Documentation

**COMING SOON**
