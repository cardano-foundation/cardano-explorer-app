Cardano Explorer App
====================
[![Tests](https://github.com/input-output-hk/cardano-explorer-app/workflows/Tests/badge.svg)](https://github.com/input-output-hk/cardano-explorer-app/actions?query=workflow%3ATests)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

A React app with GraphQL client interfacing with [Cardano GraphQL](https://github.com/input-output-hk/cardano-graphql).

### Environment Variables
See [environment](source/environment.ts) for defaults.
- `CARDANO_ERA`
- `CARDANO_NETWORK`
- `GRAPHQL_API_PROTOCOL`
- `GRAPHQL_API_HOST`
- `GRAPHQL_API_PORT`
- `GRAPHQL_API_PATH`
- `POLLING_INTERVAL`
- `GA_TRACKING_ID`
- `DEBUG`

## Build
This project uses an offline package cache to enable reproducible builds.

### yarn
```console
yarn --offline && yarn static:build
```

### nix
``` console
nix-build -A cardano-explorer-app
```
## Deploy
The static bundle can be deployed using a standard web server. A simple [Node.js program](deploy/index.js) 
is available for deploying the build to an AWS S3 bucket.

```console
AWS_ACCESS_KEY_ID=your_access_key_id \
AWS_SECRET_ACCESS_KEY=your_secret_access_key node \
./deploy/example_deployment.js
```

## Development
The environment is configured to access a remote managed deployment of the API, 
however you can run a local stack using Docker and use a `.env` to work offline. 
See [.env.example](.env.example)

### `yarn dev`
- Starts the development version of the app by default at http://localhost:4000
- Generates graphql typings from the referenced schema in [`@cardano-graphql/client-ts`](https://github.com/input-output-hk/cardano-graphql/tree/master/packages/client-ts) 
and documents within the codebase.
- Any changes to graphql documents will trigger the TypeScript generator.

###  Storybook

All visual components should be developed in Storybook first.

### `yarn storybook`

### Continuous Deployment
The `master` and `develop` branches are continuously deployed, with PRs creating merge previews to assist with review:
#### Mainnet
[![Netlify Status](https://api.netlify.com/api/v1/badges/09492acb-61fd-4745-8b0e-60c8886f60d1/deploy-status)](https://cardano-explorer-mainnet.netlify.app)
#### Testnet
[![Netlify Status](https://api.netlify.com/api/v1/badges/16628b5d-b1f2-429b-a707-bbdec0564fe9/deploy-status)](https://cardano-explorer-testnet.netlify.app)
