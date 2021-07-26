Changelog
=========

## 1.6.0

### Compatible with:

- [`cardano-graphql`: `5.0.0`](https://github.com/input-output-hk/cardano-graphql/releases/tag/5.0.0)

### Features
-  Use `Asset.decimals` to present token qty with the correct factor ([4d475fe](https://github.com/input-output-hk/cardano-explorer-app/commit/4d475fe3749f3f8495b2ee33d93995b09391fe94))

### Fixes
- tooltip position on small screen size ([213f5c3](https://github.com/input-output-hk/cardano-explorer-app/commit/213f5c316d6195f6dd714630a8906f530abe4119))

## 1.5.0

### Compatible with:

- [`cardano-graphql`: `4.0.0`](https://github.com/input-output-hk/cardano-graphql/releases/tag/4.0.0)

### Features
- add query to support fetching transaction metadata ([d5f4344](https://github.com/input-output-hk/cardano-explorer-app/commit/d5f4344959be2f0bdd4e59426e915c5d85283c0c)
- asset metadata in tooltip ([e44a98d](https://github.com/input-output-hk/cardano-explorer-app/commit/e44a98dd0a229601abd527fef77cb85f96d3964d)
- add global slot number support ([65c4a32](https://github.com/input-output-hk/cardano-explorer-app/commit/65c4a3279b0517f4d0e07f3d5b6188239130a0bb)
- add support link to footer ([957b3ad](https://github.com/input-output-hk/cardano-explorer-app/commit/957b3ad1378de2f3206b391e55cf4f923278452d)
- allow rewards query ([30b0c68](https://github.com/input-output-hk/cardano-explorer-app/commit/30b0c68d249c05ec1d50e2fd972056cb2641e0b4)

### Fixes
- remove stray acute character ([c67279a](https://github.com/input-output-hk/cardano-explorer-app/commit/c67279a3108595c6633932d670e442fef1a22ed6)
- infinite loading after block search ([b782199](https://github.com/input-output-hk/cardano-explorer-app/commit/b782199da40707a39932f3d4f5dc55e2b4da000d)
- use protocolVersion.major comparison to determine epoch slot count ([4c676d7](https://github.com/input-output-hk/cardano-explorer-app/commit/4c676d744eb2ca534b82635df7703d69722d966d)

### Refactorings
- replace use fingerprint from API ([2b5ca7c](https://github.com/input-output-hk/cardano-explorer-app/commit/2b5ca7c66a85bbac8a8fdead277bcd33d28ba13e)

## 1.4.0

### Compatible with:

- [`cardano-graphql`: `3.2.0`](https://github.com/input-output-hk/cardano-graphql/releases/tag/3.2.0)

### Features
- foundational multi-asset support ([3c94cee](https://github.com/input-output-hk/cardano-explorer-app/commit/3c94ceec8337d58b095f1bd389cd8fc983a0cfd5))

## 1.3.0

### Compatible with:

- [`cardano-graphql`: `3.1.1`](https://github.com/input-output-hk/cardano-graphql/releases/tag/3.1.1)

### Features
- transaction metadata ([6c3baa8](https://github.com/input-output-hk/cardano-explorer-app/commit/6c3baa84de89c3b84df3240e10b9c5141635064f))

### Fixes
- only show merkel root if present ([98f8e5d](https://github.com/input-output-hk/cardano-explorer-app/commit/98f8e5d93a69101e89f496041a06b4d49295b5f8))
- "0" displayed on a line after Transaction Fee / Total Output ([4f49075](https://github.com/input-output-hk/cardano-explorer-app/commit/4f49075776c8370b80ece6bdc9c3e491746cf9b5))

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
