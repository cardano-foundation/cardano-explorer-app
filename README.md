Cardano Explorer App
====================

Frontend web app for the Cardano Explorer. This project depends on the [Cardano GraphQL API Service](https://github.com/input-output-hk/cardano-graphql), as defined in the [docker stack](docker-compose.yml). The schema typings are generated from the running API service, and should be regenerated when changing the version.

## Development
### Start
1. `yarn start-dependencies`
2. `yarn dev`

### Stop
`yarn stop-dependencies`

By default the app will be at http://localhost:4000, and an instance of the GraphQL Playground at http://localhost:3000/.

`yarn start-dependencies` will pull the most recent development containers for cardano-graphql and the seed database. It will also regenerate the typings from any schema changes, which may lead to a git diff. This is to be expected and should be committed. 

In the future, container versions will be statically pinned from the docker-compose.yml and only updated when appropriate to do so. For these early stages of development we want to ensure the backend and frontend remain aligned.

## Storybook

All visual components should be developed in Storybook first.

Run `yarn storybook`
