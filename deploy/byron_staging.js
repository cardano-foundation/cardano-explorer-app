const deploy = require('./index')

process.env.CARDANO_ERA = 'byron'
// TODO: Make mainnet once theme is done, as staging is tracking
// mainnet
process.env.CARDANO_NETWORK = 'testnet'
process.env.GRAPHQL_API_PROTOCOL = 'https'
process.env.GRAPHQL_API_HOST = 'cardano-graphql-byron.daedalus-operations.com'
process.env.GRAPHQL_PORT = '443'
process.env.GRAPHQL_WEBSOCKET_PROTOCOL = 'ws'
process.env.GRAPHQL_WEBSOCKET_HOST = 'cardano-graphql-byron.daedalus-operations.com'

deploy()
