import ApolloClient from 'apollo-client';

import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import {
  SearchByIdQuery,
  SearchByIdQueryVariables,
  SearchForAddressQuery,
  SearchForAddressQueryVariables,
  SearchForBlockByNumberQuery,
  SearchForBlockByNumberQueryVariables,
  SearchForEpochByNumberQuery,
  SearchForEpochByNumberQueryVariables,
} from '../../../typings/graphql-schema';
import searchByIdQuery from './searchById.graphql';
import searchForAddressQuery from './searchForAddress.graphql';
import searchForBlockByNumberQuery from './searchForBlockByNumber.graphql';
import searchForEpochByNumberQuery from './searchForEpochByNumber.graphql';

export class SearchApi {
  public searchForAddressQuery: GraphQLRequest<
    SearchForAddressQuery,
    SearchForAddressQueryVariables
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

  constructor(client: ApolloClient<any>) {
    this.searchForAddressQuery = new GraphQLRequest(
      client,
      searchForAddressQuery
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
