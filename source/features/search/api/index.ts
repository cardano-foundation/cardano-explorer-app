import ApolloClient from 'apollo-client';

import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import {
  SearchForAddressQuery,
  SearchForAddressQueryVariables,
  SearchForBlockByIdQuery,
  SearchForBlockByIdQueryVariables,
  SearchForBlockByNumberQuery,
  SearchForBlockByNumberQueryVariables,
  SearchForEpochByNumberQuery,
  SearchForEpochByNumberQueryVariables,
  SearchForTransactionByIdQuery,
  SearchForTransactionByIdQueryVariables,
} from '../../../typings/graphql-schema';
import searchForAddressQuery from './searchForAddress.graphql';
import searchForBlockByIdQuery from './searchForBlockById.graphql';
import searchForBlockByNumberQuery from './searchForBlockByNumber.graphql';
import searchForEpochByNumberQuery from './searchForEpochByNumber.graphql';
import searchForTransactionByIdQuery from './searchForTransactionById.graphql';

export class SearchApi {
  public searchForAddressQuery: GraphQLRequest<
    SearchForAddressQuery,
    SearchForAddressQueryVariables
  >;

  public searchForBlockByIdQuery: GraphQLRequest<
    SearchForBlockByIdQuery,
    SearchForBlockByIdQueryVariables
  >;

  public searchForBlockByNumberQuery: GraphQLRequest<
    SearchForBlockByNumberQuery,
    SearchForBlockByNumberQueryVariables
  >;

  public searchForEpochByNumberQuery: GraphQLRequest<
    SearchForEpochByNumberQuery,
    SearchForEpochByNumberQueryVariables
  >;

  public searchForTransactionByIdQuery: GraphQLRequest<
    SearchForTransactionByIdQuery,
    SearchForTransactionByIdQueryVariables
  >;

  constructor(client: ApolloClient<any>) {
    this.searchForAddressQuery = new GraphQLRequest(
      client,
      searchForAddressQuery
    );
    this.searchForBlockByIdQuery = new GraphQLRequest(
      client,
      searchForBlockByIdQuery
    );
    this.searchForBlockByNumberQuery = new GraphQLRequest(
      client,
      searchForBlockByNumberQuery
    );
    this.searchForEpochByNumberQuery = new GraphQLRequest(
      client,
      searchForEpochByNumberQuery
    );
    this.searchForTransactionByIdQuery = new GraphQLRequest(
      client,
      searchForTransactionByIdQuery
    );
  }
}
