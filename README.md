Cardano Explorer App
====================
[![Build Status](https://jenkins.daedalus-operations.com/buildStatus/icon?job=cardano-explorer-app%2Fdevelop)](https://jenkins.daedalus-operations.com/blue/organizations/jenkins/cardano-explorer-app/)

Web app for the Cardano Explorer, covering the Byron and Shelley eras. This project depends on the [Cardano GraphQL API stack](https://github.com/input-output-hk/cardano-graphql), as defined in [docker-compose](docker-compose.yml). The schema typings are generated from the running API service, and should be regenerated when changing the version.

## Development
See [.env.example](.env.example) for _optional_ config

### Start in separate terminals
#### `yarn start-dependencies`

- Starts the Cardano GraphQL Docker stack, including the seeded PostgreSQL and Hasura instances with an instance of the GraphQL Playground at http://localhost:3100
- Generates a local copy of the Cardano GraphQL schema for IDE auto-completion.
- Generates graphql typings from the schema and documents within the codebase.
#### `yarn generate:graphql-typings --watch`
- Any changes to graphql documents within the codebase will trigger the TypeScript generator.
#### `yarn dev`
- Starts the development version of the app by default at http://localhost:4000
### Stop
#### `yarn stop-dependencies`


## Storybook

All visual components should be developed in Storybook first.

Run `yarn storybook`

## Continuous Delivery for testing

When code is merged into `develop`, Jenkins pushes builds to S3 buckets for immediate access & testing. This process can be extended to cover production deployments, with load-balancing and SSL termination.

| Era | Network | Data Provider | URL |
| --- | --- | --- | --- |
| Bryon | Mainnet | cardano-node-explorer | http://byron-staging-develop-explorer.s3-website-ap-southeast-2.amazonaws.com |
| Bryon | Testnet | cardano-node-explorer | http://byron-testnet-develop-explorer.s3-website-ap-southeast-2.amazonaws.com |
