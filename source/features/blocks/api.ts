import ApolloClient from 'apollo-client';
import {
  GetLatestBlocksQuery,
  GetLatestBlocksQueryVariables,
} from '../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../lib/graphql/GraphQLRequest';
import getLatestBlocksQuery from './graphql/getLatestBlocks.graphql';

export class BlocksApi {
  public getLatestBlocksQuery: GraphQLRequest<
    GetLatestBlocksQuery,
    GetLatestBlocksQueryVariables
  >;

  constructor(client: ApolloClient<any>) {
    this.getLatestBlocksQuery = new GraphQLRequest(
      client,
      getLatestBlocksQuery
    );
  }
}
