import ApolloClient from 'apollo-client';

import {
  GetBlocksQuery,
  GetBlocksQueryVariables,
} from '../../typings/graphql-schema';
import { GraphQLRequest } from '../../utils/graphql/GraphQLRequest';
import getBlocksQuery from './graphql/getBlocks.graphql';

export class SearchApi {
  public getBlocksByIdsQuery: GraphQLRequest<
    GetBlocksQuery,
    GetBlocksQueryVariables
  >;

  constructor(client: ApolloClient<any>) {
    this.getBlocksByIdsQuery = new GraphQLRequest<
      GetBlocksQuery,
      GetBlocksQueryVariables
    >(client, getBlocksQuery);
  }
}
