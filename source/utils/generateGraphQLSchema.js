const fs = require('fs');
const path = require('path');
const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge');
const { printSchemaWithDirectives } = require('@graphql-tools/utils');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const cardanoDbHasuraSchema = loadFilesSync('./node_modules/@cardano-graphql/client-ts/api/cardano-db-hasura/schema.graphql');
const genesisSchema = loadFilesSync('./node_modules/@cardano-graphql/client-ts/api/genesis/schema.graphql');
const mergedTypes = mergeTypeDefs([cardanoDbHasuraSchema, genesisSchema], {
  throwOnConflict: true
});

const executableSchema = makeExecutableSchema({ typeDefs: [mergedTypes] });
const schema = printSchemaWithDirectives(executableSchema);

fs.writeFileSync(path.join(__dirname, '../../schema.graphql'), schema);
