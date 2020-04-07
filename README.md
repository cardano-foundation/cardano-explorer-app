Cardano Explorer App
====================
[![Build Status](https://jenkins.daedalus-operations.com/buildStatus/icon?job=cardano-explorer-app%2Fdevelop)](https://jenkins.daedalus-operations.com/blue/organizations/jenkins/cardano-explorer-app/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A React app with GraphQL client interfacing with [Cardano GraphQL](https://github.com/input-output-hk/cardano-graphql).

## Development
The environment is configured to access a remote managed deployment of the API, 
however you can run a local stack using Docker and use a `.env` to work offline. 
See [.env.example](.env.example)

### `yarn dev`
- Starts the development version of the app by default at http://localhost:4000
- Generates graphql typings from the referenced schema in `cardano-graphql-ts` and documents within the codebase.
- Any changes to graphql documents will trigger the TypeScript generator.

## Storybook

All visual components should be developed in Storybook first.

### `yarn storybook`

## Continuous Delivery for testing

When code is merged into `develop`, Jenkins pushes builds to S3 buckets for immediate access & testing. This process can be extended to cover production deployments, with load-balancing and SSL termination.

| Era | Network | Data Provider | URL |
| --- | --- | --- | --- |
| Byron | Mainnet | cardano-node-explorer | http://byron-mainnet-develop-explorer.s3-website-ap-southeast-2.amazonaws.com |
| Byron | Testnet | cardano-node-explorer | http://byron-testnet-develop-explorer.s3-website-ap-southeast-2.amazonaws.com |
