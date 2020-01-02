import { GraphQLClient } from 'graphql-request';
import {
  GetBlocksInEpochQuery,
  GetBlocksInEpochQueryVariables,
  GetBlocksInRangeQuery,
  GetBlocksInRangeQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getBlocksInEpochQuery from './getBlocksInEpoch.graphql';
import getBlocksInRangeQuery from './getBlocksInRange.graphql';

export class BlocksApi {
  public getBlocksInRangeQuery: GraphQLRequest<
    GetBlocksInRangeQuery,
    GetBlocksInRangeQueryVariables
  >;
  public getBlocksInEpochQuery: GraphQLRequest<
    GetBlocksInEpochQuery,
    GetBlocksInEpochQueryVariables
  >;
  constructor(client: GraphQLClient) {
    this.getBlocksInRangeQuery = new GraphQLRequest(
      client,
      getBlocksInRangeQuery
    );
    this.getBlocksInEpochQuery = new GraphQLRequest(
      client,
      getBlocksInEpochQuery
    );
  }
}
