import ApolloClient from 'apollo-client';

import {
  GetTransactionsQuery,
  GetTransactionsQueryVariables,
  SearchBlockByIdQuery,
  SearchBlockByIdQueryVariables,
} from '../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../lib/graphql/GraphQLRequest';
import searchBlockByIdQuery from './graphql/searchForBlockById.graphql';
import searchForTransactionByIdQuery from './graphql/searchForTransactionById.graphql';

export class SearchApi {
  public searchForBlockByIdQuery: GraphQLRequest<
    SearchBlockByIdQuery,
    SearchBlockByIdQueryVariables
  >;

  public searchForTransactionByIdQuery: GraphQLRequest<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >;

  constructor(client: ApolloClient<any>) {
    this.searchForBlockByIdQuery = new GraphQLRequest<
      SearchBlockByIdQuery,
      SearchBlockByIdQueryVariables
    >(client, searchBlockByIdQuery);

    this.searchForTransactionByIdQuery = new GraphQLRequest<
      GetTransactionsQuery,
      GetTransactionsQueryVariables
    >(client, searchForTransactionByIdQuery);
  }
}
