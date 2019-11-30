const deploy = require('./index');

process.env.CARDANO_ERA = 'byron';
process.env.CARDANO_NETWORK = 'mainnet';
process.env.GRAPHQL_API_PROTOCOL = 'http';
process.env.GRAPHQL_API_HOST = 'cardano-networks-mainnet-941840574.ap-southeast-2.elb.amazonaws.com';
process.env.GRAPHQL_PORT = '80';

const branch = process.env.BRANCH || 'develop';
process.env.BUCKET = `byron-staging-${branch}-explorer`;

deploy();
