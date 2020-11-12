import { GraphQLClient } from 'graphql-request';
import {
  GetBlockTransactionsQuery,
  GetBlockTransactionsQueryVariables,
  GetPaymentAddressTransactionsQuery,
  GetPaymentAddressTransactionsQueryVariables,
  GetStakeAddressTransactionsQuery,
  GetStakeAddressTransactionsQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getBlockTransactions from './getBlockTransactions.graphql';
import getPaymentAddressTransactions from './getPaymentAddressTransactions.graphql';
import getStakeAddressTransactions from './getStakeAddressTransactions.graphql';

export class TransactionsApi {
  public getBlockTransactionsQuery: GraphQLRequest<
    GetBlockTransactionsQuery,
    GetBlockTransactionsQueryVariables
  >;
  public getPaymentAddressTransactionsQuery: GraphQLRequest<
    GetPaymentAddressTransactionsQuery,
    GetPaymentAddressTransactionsQueryVariables
  >;
  public getStakeAddressTransactionsQuery: GraphQLRequest<
    GetStakeAddressTransactionsQuery,
    GetStakeAddressTransactionsQueryVariables
  >;
  constructor(client: GraphQLClient) {
    this.getBlockTransactionsQuery = new GraphQLRequest(
      client,
      getBlockTransactions
    );
    this.getPaymentAddressTransactionsQuery = new GraphQLRequest(
      client,
      getPaymentAddressTransactions
    );
    this.getStakeAddressTransactionsQuery = new GraphQLRequest(
      client,
      getStakeAddressTransactions
    );
  }
}
