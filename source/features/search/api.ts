import ApolloClient from 'apollo-client';

import {
  SearchForBlockByIdQuery,
  SearchForBlockByIdQueryVariables,
  SearchForEpochByNumberQuery,
  SearchForEpochByNumberQueryVariables,
  SearchForTransactionByIdQuery,
  SearchForTransactionByIdQueryVariables,
} from '../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../lib/graphql/GraphQLRequest';
import searchForBlockByIdQuery from './graphql/searchForBlockById.graphql';
import searchForEpochByNumberQuery from './graphql/searchForEpochByNumber.graphql';
import searchForTransactionByIdQuery from './graphql/searchForTransactionById.graphql';

export class SearchApi {
  public searchForBlockByIdQuery: GraphQLRequest<
    SearchForBlockByIdQuery,
    SearchForBlockByIdQueryVariables
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
    this.searchForBlockByIdQuery = new GraphQLRequest<
      SearchForBlockByIdQuery,
      SearchForBlockByIdQueryVariables
    >(client, searchForBlockByIdQuery);

    this.searchForEpochByNumberQuery = new GraphQLRequest<
      SearchForEpochByNumberQuery,
      SearchForEpochByNumberQueryVariables
    >(client, searchForEpochByNumberQuery);

    this.searchForTransactionByIdQuery = new GraphQLRequest<
      SearchForTransactionByIdQuery,
      SearchForTransactionByIdQueryVariables
    >(client, searchForTransactionByIdQuery);
  }
}
