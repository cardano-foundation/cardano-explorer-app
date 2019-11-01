const deploy = require('./index')

process.env.CARDANO_ERA = 'byron'
process.env.CARDANO_NETWORK = 'mainnet'
process.env.GRAPHQL_API_PROTOCOL = 'https'
process.env.GRAPHQL_API_HOST = 'cardano-graphql-byron.daedalus-operations.com'
process.env.GRAPHQL_PORT = '443'
process.env.GRAPHQL_WEBSOCKET_PROTOCOL = 'ws'
process.env.GRAPHQL_WEBSOCKET_HOST = 'cardano-graphql-byron.daedalus-operations.com'

const branch = process.env.BRANCH || 'develop'
process.env.BUCKET = `byron-staging-${branch}-explorer`

deploy()
