Cardano Explorer App
====================

This is the frontend for the Cardano Explorer.

## Installation

1. **GraphQL Backend:** checkout the `feature/native-schema` 
branch from [cardano-graphql](https://github.com/input-output-hk/cardano-graphql/)
and run `npm install`.

2. **Frontend**: checkout `master` of this repo and run `yarn install` (YARN!)

## Development

**Note: First install backend and frontend (see above)**

1. In the [cardano-graphql](https://github.com/input-output-hk/cardano-graphql/) 
repo: Start GraphQL backend with `npm run dc:dev`
2. In this repo start the frontend with `yarn dev`

You should now see the …

- Frontend at http://localhost:4000
- GraphQL playground at http://localhost:3000/
