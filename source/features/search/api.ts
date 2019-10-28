import ApolloClient from 'apollo-client';

import {
  GetBlocksQuery,
  GetBlocksQueryVariables,
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
} from '../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../lib/graphql/GraphQLRequest';
import getBlocksQuery from '../blocks/graphql/getBlocks.graphql';
import getTransactionsQuery from '../transactions/graphql/getTransactions.graphql';

export class SearchApi {
  public getBlockByIdQuery: GraphQLRequest<
    GetBlocksQuery,
    GetBlocksQueryVariables
  >;

  public getTransactionByIdQuery: GraphQLRequest<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >;

  constructor(client: ApolloClient<any>) {
    this.getBlockByIdQuery = new GraphQLRequest<
      GetBlocksQuery,
      GetBlocksQueryVariables
    >(client, getBlocksQuery);

    this.getTransactionByIdQuery = new GraphQLRequest<
      GetTransactionsQuery,
      GetTransactionsQueryVariables
    >(client, getTransactionsQuery);
  }
}
