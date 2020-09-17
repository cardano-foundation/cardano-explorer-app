Changelog
=========

## 1.1.0
### Features
- [Split slots & blocks into separate columns](https://github.com/input-output-hk/cardano-explorer-app/pull/338)
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
