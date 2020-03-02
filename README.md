Cardano Explorer App
====================
[![Build Status](https://jenkins.daedalus-operations.com/buildStatus/icon?job=cardano-explorer-app%2Fdevelop)](https://jenkins.daedalus-operations.com/blue/organizations/jenkins/cardano-explorer-app/)

Cardano Explorer uses [Cardano GraphQL](https://github.com/input-output-hk/cardano-graphql) as the network interface. For the purpose of integration testing, it's a git **submodule** of this repository.

```
git clone https://github.com/input-output-hk/cardano-explorer-app.git --recurse-submodules
```

The schema typings are generated from the running API service, and are therefore not committed to source control. 

## Development
See [.env.example](.env.example) for _optional_ config

### Start in separate terminals
#### `yarn start-dependencies`

- Starts the Cardano GraphQL Docker stack, including the seeded PostgreSQL and Hasura instances with an instance of the GraphQL Playground at http://localhost:3100
#### `yarn generate:graphql-typings --watch`
- Generates graphql typings from the referenced schema in `cardano-graphql-ts` and documents within the codebase.
- Any changes to graphql documents will trigger the TypeScript generator.
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
| Byron | Mainnet | cardano-node-explorer | http://byron-mainnet-develop-explorer.s3-website-ap-southeast-2.amazonaws.com |
| Byron | Testnet | cardano-node-explorer | http://byron-testnet-develop-explorer.s3-website-ap-southeast-2.amazonaws.com |
