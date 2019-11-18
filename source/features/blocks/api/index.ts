import ApolloClient from 'apollo-client';
import {
  GetBlocksInRangeQuery,
  GetBlocksInRangeQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getBlocksInRangeQuery from './getBlocksInRange.graphql';

export class BlocksApi {
  // https://github.com/input-output-hk/cardano-graphql/issues/52
  public getBlocksInRangeQuery: GraphQLRequest<
    GetBlocksInRangeQuery,
    GetBlocksInRangeQueryVariables
  >;
  constructor(client: ApolloClient<any>) {
    this.getBlocksInRangeQuery = new GraphQLRequest(
      client,
      getBlocksInRangeQuery
    );
  }
}

export type BlocksApiRequestVariables<Request> = Request extends GraphQLRequest<
  any,
  infer Variables
>
  ? Variables
  : never;
