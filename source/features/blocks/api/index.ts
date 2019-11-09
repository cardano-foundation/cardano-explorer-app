import ApolloClient from 'apollo-client';
import {
  GetBlocksInRangeQuery,
  GetBlocksInRangeQueryVariables,
  GetLatestBlocksQuery,
  GetLatestBlocksQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getBlocksInRangeQuery from './getBlocksInRange.graphql';
import getLatestBlocksQuery from './getLatestBlocks.graphql';

export class BlocksApi {
  // https://github.com/input-output-hk/cardano-graphql/issues/52
  public getLatestBlocksQuery: GraphQLRequest<
    GetLatestBlocksQuery,
    GetLatestBlocksQueryVariables
  >;
  public getBlocksInRangeQuery: GraphQLRequest<
    GetBlocksInRangeQuery,
    GetBlocksInRangeQueryVariables
  >;
  constructor(client: ApolloClient<any>) {
    this.getLatestBlocksQuery = new GraphQLRequest(
      client,
      getLatestBlocksQuery
    );
    this.getBlocksInRangeQuery = new GraphQLRequest(
      client,
      getBlocksInRangeQuery
    );
  }
}
