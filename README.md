Cardano Explorer App
====================

Frontend web app for the Cardano Explorer. This project depends on the [Cardano GraphQL API Service](https://github.com/input-output-hk/cardano-graphql), as defined in the [docker stack](docker-compose.yml).

## Development
1. `docker-compose up`
2. `yarn dev`

By default the app will be at http://localhost:4000, and an instance of the GraphQL Playground at http://localhost:3000/. Override this using the `API_PORT` env.

## Storybook

All visual components should be developed in Storybook first.

Run `yarn storybook`
