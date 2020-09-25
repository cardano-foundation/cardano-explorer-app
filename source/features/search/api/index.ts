import { GraphQLClient } from 'graphql-request';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import {
  SearchByIdQuery,
  SearchByIdQueryVariables,
  SearchForBlockByNumberQuery,
  SearchForBlockByNumberQueryVariables,
  SearchForEpochByNumberQuery,
  SearchForEpochByNumberQueryVariables,
  SearchForPaymentAddressQuery,
  SearchForPaymentAddressQueryVariables,
  SearchForStakeAddressQuery,
  SearchForStakeAddressQueryVariables
} from '../../../typings/graphql-schema';
import searchByIdQuery from './searchById.graphql';
import searchForBlockByNumberQuery from './searchForBlockByNumber.graphql';
import searchForEpochByNumberQuery from './searchForEpochByNumber.graphql';
import searchForPaymentAddressQuery from './searchForPaymentAddress.graphql';
import searchForStakeAddressQuery from './searchForStakeAddress.graphql';

export class SearchApi {
  public searchForPaymentAddressQuery: GraphQLRequest<
    SearchForPaymentAddressQuery,
    SearchForPaymentAddressQueryVariables
  >;

  public searchForStakeAddressQuery: GraphQLRequest<
    SearchForStakeAddressQuery,
    SearchForStakeAddressQueryVariables
  >;

  public searchByIdQuery: GraphQLRequest<
    SearchByIdQuery,
    SearchByIdQueryVariables
  >;

  public searchForBlockByNumberQuery: GraphQLRequest<
    SearchForBlockByNumberQuery,
    SearchForBlockByNumberQueryVariables
  >;

  public searchForEpochByNumberQuery: GraphQLRequest<
    SearchForEpochByNumberQuery,
    SearchForEpochByNumberQueryVariables
  >;

  constructor(client: GraphQLClient) {
    this.searchForPaymentAddressQuery = new GraphQLRequest(
      client,
      searchForPaymentAddressQuery
    );
    this.searchForStakeAddressQuery = new GraphQLRequest(
      client,
      searchForStakeAddressQuery
    );
    this.searchByIdQuery = new GraphQLRequest(client, searchByIdQuery);
    this.searchForBlockByNumberQuery = new GraphQLRequest(
      client,
      searchForBlockByNumberQuery
    );
    this.searchForEpochByNumberQuery = new GraphQLRequest(
      client,
      searchForEpochByNumberQuery
    );
  }
}
