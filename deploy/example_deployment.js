const deploy = require('./index');

process.env.CARDANO_ERA = 'byron';
process.env.CARDANO_NETWORK = 'mainnet';
process.env.GRAPHQL_API_PROTOCOL = 'https';
process.env.GRAPHQL_API_HOST = 'a-cardano-graphql-deployment.com';
process.env.GRAPHQL_API_PORT = '443';
process.env.BUCKET = 'byron-mainnet-explorer';
process.env.AWS_DEFAULT_REGION = 'ap-southeast-2';

deploy();
