const deploy = require('./index');

process.env.CARDANO_ERA = 'byron';
process.env.CARDANO_NETWORK = 'testnet';
process.env.GRAPHQL_API_PROTOCOL = 'https';
process.env.GRAPHQL_API_HOST = 'cardano-networks-testnet-1902717266.ap-southeast-2.elb.amazonaws.com';
process.env.GRAPHQL_PORT = '443';

const branch = process.env.BRANCH || 'develop';
process.env.BUCKET = `byron-testnet-${branch}-explorer`;

deploy();
