Changelog
=========

## 1.2.1

### Compatible with:

- [`cardano-graphql`: `3.0.0`](https://github.com/input-output-hk/cardano-graphql/releases/tag/3.0.0)

Compatibility upgrade

### Fixes
- scope withdrawals query to address ([cad9e3f](https://github.com/input-output-hk/cardano-explorer-app/commit/cad9e3f48948cbe6bfb6f6adb795a6bc06fde2fb))
- check search strings for shelley-era addresses, to avoid clash with testnet stake addresses and hashes ([58c004a](https://github.com/input-output-hk/cardano-explorer-app/commit/58c004a4422c01aef320802bb780361a93334a27))

## 1.2.0

### Compatible with:

- [`cardano-graphql`: `2.2.0`](https://github.com/input-output-hk/cardano-graphql/releases/tag/2.2.0)

### Features
- [show deposits and reclaims when present in transaction](https://github.com/input-output-hk/cardano-explorer-app/pull/361)
- [add withdrawals to TransactionInfo](https://github.com/input-output-hk/cardano-explorer-app/pull/363)
- [resolve stake address searches based on withdrawals](https://github.com/input-output-hk/cardano-explorer-app/pull/363)
### Chores
- [use new combined cardano-graphql schema from client package, removing local build step](https://github.com/input-output-hk/cardano-explorer-app/pull/362)

## 1.1.0
### Features
- [Split slots & blocks into separate columns](https://github.com/input-output-hk/cardano-explorer-app/pull/347)
- [Add package.json version to footer](https://github.com/input-output-hk/cardano-explorer-app/pull/348)
### Chores
- [Dynamically calc Byron epochs length](https://github.com/input-output-hk/cardano-explorer-app/pull/334)
- [Update to latest react-polymorph](https://github.com/input-output-hk/cardano-explorer-app/pull/351)
- [yarn offline cache](https://github.com/input-output-hk/cardano-explorer-app/pull/356)
## 1.0.2
### Fixes
- [#334](https://github.com/input-output-hk/cardano-explorer-app/issues/334)
- [#342](https://github.com/input-output-hk/cardano-explorer-app/issues/342)
- [#345](https://github.com/input-output-hk/cardano-explorer-app/issues/345)
### Chores
- Re-enables the test suite CI run
- Applies lint fixes previously missed

## 1.0.1
Compatibility upgrade in preparation for the Shelley hard fork. The GraphQL client now integrates 
with [Cardano GraphQL 2.0.0](https://github.com/input-output-hk/cardano-graphql/releases/tag/2.0.0)
using [@cardano-graphql/client-ts](https://github.com/input-output-hk/cardano-graphql/tree/master/packages/client-ts)
 for static type checking.

## 1.0.0
First production-ready release. 
