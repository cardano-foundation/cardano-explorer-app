import { GraphQLClient } from 'graphql-request';
import {
  GetAddressTransactionsQuery,
  GetAddressTransactionsQueryVariables,
  GetBlockTransactionsQuery,
  GetBlockTransactionsQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getAddressTransactions from './getAddressTransactions.graphql';
import getBlockTransactions from './getBlockTransactions.graphql';

export class TransactionsApi {
  public getBlockTransactionsQuery: GraphQLRequest<
    GetBlockTransactionsQuery,
    GetBlockTransactionsQueryVariables
  >;
  public getAddressTransactionsQuery: GraphQLRequest<
    GetAddressTransactionsQuery,
    GetAddressTransactionsQueryVariables
  >;
  constructor(client: GraphQLClient) {
    this.getBlockTransactionsQuery = new GraphQLRequest(
      client,
      getBlockTransactions
    );
    this.getAddressTransactionsQuery = new GraphQLRequest(
      client,
      getAddressTransactions
    );
  }
}
