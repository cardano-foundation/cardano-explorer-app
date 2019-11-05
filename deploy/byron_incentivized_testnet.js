const deploy = require('./index');

process.env.CARDANO_ERA = 'byron';
process.env.CARDANO_NETWORK = 'incentivized-testnet';

process.env.GRAPHQL_API_PROTOCOL = 'https';
process.env.GRAPHQL_API_HOST = 'TODO';
process.env.GRAPHQL_PORT = '443';

const branch = process.env.BRANCH || 'develop';
process.env.BUCKET = `byron-incentivized-testnet-${branch}-explorer`;

deploy();
