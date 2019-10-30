import ApolloClient from 'apollo-client';

import {
  SearchForBlockByIdQuery,
  SearchForBlockByIdQueryVariables,
  SearchForBlockByNumberQuery,
  SearchForBlockByNumberQueryVariables,
  SearchForEpochByNumberQuery,
  SearchForEpochByNumberQueryVariables,
  SearchForTransactionByIdQuery,
  SearchForTransactionByIdQueryVariables,
} from '../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../lib/graphql/GraphQLRequest';
import searchForBlockByIdQuery from './graphql/searchForBlockById.graphql';
import searchForBlockByNumberQuery from './graphql/searchForBlockByNumber.graphql';
import searchForEpochByNumberQuery from './graphql/searchForEpochByNumber.graphql';
import searchForTransactionByIdQuery from './graphql/searchForTransactionById.graphql';

export class SearchApi {
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
