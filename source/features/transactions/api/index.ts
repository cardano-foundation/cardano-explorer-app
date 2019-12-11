import { GraphQLClient } from 'graphql-request';
import {
  GetBlockTransactionsQuery,
  GetBlockTransactionsQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getBlockTransactions from './getBlockTransactions.graphql';

export class TransactionsApi {
  public getBlockTransactionsQuery: GraphQLRequest<
    GetBlockTransactionsQuery,
    GetBlockTransactionsQueryVariables
  >;
  constructor(client: GraphQLClient) {
    this.getBlockTransactionsQuery = new GraphQLRequest(
      client,
      getBlockTransactions
    );
  }
}
