import { GraphQLClient } from 'graphql-request';
import {
  GetBlocksInRangeQuery,
  GetBlocksInRangeQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getBlocksInRangeQuery from './getBlocksInRange.graphql';

console.log(getBlocksInRangeQuery);

export class BlocksApi {
  // https://github.com/input-output-hk/cardano-graphql/issues/52
  public getBlocksInRangeQuery: GraphQLRequest<
    GetBlocksInRangeQuery,
    GetBlocksInRangeQueryVariables
  >;
  constructor(client: GraphQLClient) {
    this.getBlocksInRangeQuery = new GraphQLRequest(
      client,
      getBlocksInRangeQuery
    );
  }
}
