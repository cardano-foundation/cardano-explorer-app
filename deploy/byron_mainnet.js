const deploy = require('./index');

process.env.CARDANO_ERA = 'byron';
process.env.CARDANO_NETWORK = 'mainnet';
process.env.GRAPHQL_API_PROTOCOL = 'https';
process.env.GRAPHQL_API_HOST = 'cardano-graphql-mainnet.daedalus-operations.com';
process.env.GRAPHQL_API_PORT = '443';

const branch = process.env.BRANCH || 'develop';
process.env.BUCKET = `byron-mainnet-${branch}-explorer`;

deploy();
