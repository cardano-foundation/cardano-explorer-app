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

## Continuous Delivery

When code is merged into `develop`, Jenkins pushes builds to S3 buckets for immediate access & testing. This strategy can be extended once release processes are defined.

| Era | Network | Implementation | URL | Notes |
| --- | --- | --- | --- | --- |
| Bryon | Mainnet (staging deployment for testing) | cardano-node-explorer | http://byron-staging-develop-explorer.s3-website-ap-southeast-2.amazonaws.com | This is a staging environment created for testing. The cardano-node-explorer is running against mainnet. |
| Byron | Incentivized testnet | Jormungandr | http://byron-incentivized-testnet-develop-explorer.s3-website-ap-southeast-2.amazonaws.com | *Backend not yet deployed* |

As we are serving straight out of S3, HTTPS is not enabled. If we proceed with this configuration as we approach production, we can put cloudfront in front of the buckets, allocate proper domains and enable HTTPS.