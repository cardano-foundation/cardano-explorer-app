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

###  Storybook

All visual components should be developed in Storybook first.

### `yarn storybook`

### Continuous Deployment
The `develop` and PR branches are deployed continuously for the purpose of testing and development:
#### [Mainnet](https://cardano-explorer-mainnet.netlify.com)
[![Netlify Status](https://api.netlify.com/api/v1/badges/09492acb-61fd-4745-8b0e-60c8886f60d1/deploy-status)](https://app.netlify.com/sites/cardano-explorer-mainnet/deploys)
#### [Testnet](https://cardano-explorer-testnet.netlify.com)
[![Netlify Status](https://api.netlify.com/api/v1/badges/16628b5d-b1f2-429b-a707-bbdec0564fe9/deploy-status)](https://app.netlify.com/sites/cardano-explorer-testnet/deploys)

## Deployment
A simple [Node.js program](deploy/index.js) is available for deploying to an AWS S3 bucket.

### ENVs
\* optional
#### `CARDANO_ERA`: `byron | shelley`
#### `CARDANO_NETWORK`: `mainnet | testnet`
#### `GRAPHQL_API_PROTOCOL` : `https | http`
#### `GRAPHQL_API_HOST`
#### `GRAPHQL_API_PORT`
#### * `GA_MEASUREMENT_ID`
https://developers.google.com/analytics/devguides/collection
