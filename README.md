Cardano Explorer App
====================

Web app for the Cardano Explorer, covering the Byron and Shelley eras. This project depends on the [Cardano GraphQL API stack](https://github.com/input-output-hk/cardano-graphql), as defined in [docker-compose](docker-compose.yml). The schema typings are generated from the running API service, and should be regenerated when changing the version.

## Development
### Start
1. `yarn start-dependencies`
2. `yarn dev`

### Stop
`yarn stop-dependencies`

By default the app will be at http://localhost:4000, and an instance of the GraphQL Playground at http://localhost:3100/.

The GraphQL API port can be customized with the GRAPHQL_PORT variable in .env.local. This value is respected by `yarn start-dependencies`.

`yarn start-dependencies` will pull the Docker containers for the cardano-graphql stack, including the seeded PostgreSQL and Hasura instances. It will also regenerate the typings from any schema changes, which may lead to a git diff. This is to be expected and should be committed.

`CARDANO_ERA=shelley` enables the additional features this era brings to the network. 

## Storybook

All visual components should be developed in Storybook first.

Run `yarn storybook`

## Continuous Delivery

When code is merged into `develop`, Jenkins pushes builds to S3 buckets for immediate access & testing. This strategy can be extended once release processes are defined.

| Era | Network | Implementation | URL | Notes |
| --- | --- | --- | --- | --- |
| Bryon | Mainnet (staging deployment for testing) | cardano-node-explorer | http://byron-staging-develop-explorer.s3-website-ap-southeast-2.amazonaws.com | *Backend offline* |
| Byron | Incentivized testnet | Jormungandr | http://byron-incentivized-testnet-develop-explorer.s3-website-ap-southeast-2.amazonaws.com | *Backend not yet deployed* |

As we are serving straight out of S3, HTTPS is not enabled. If we proceed with this configuration as we approach production, we can put cloudfront in front of the buckets, allocate proper domains and enable HTTPS.