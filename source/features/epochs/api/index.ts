import { GraphQLClient } from 'graphql-request';
import {
  GetEpochsInRangeQuery,
  GetEpochsInRangeQueryVariables,
  GetLatestEpochsQuery,
  GetLatestEpochsQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getEpochsInRangeQuery from './getEpochsInRange.graphql';
import getLatestEpochsQuery from './getLatestEpochs.graphql';

export class EpochsApi {
  // https://github.com/input-output-hk/cardano-graphql/issues/52
  public getLatestEpochsQuery: GraphQLRequest<
    GetLatestEpochsQuery,
    GetLatestEpochsQueryVariables
  >;
  public getEpochsInRangeQuery: GraphQLRequest<
    GetEpochsInRangeQuery,
    GetEpochsInRangeQueryVariables
  >;
  constructor(client: GraphQLClient) {
    this.getLatestEpochsQuery = new GraphQLRequest(
      client,
      getLatestEpochsQuery
    );
    this.getEpochsInRangeQuery = new GraphQLRequest(
      client,
      getEpochsInRangeQuery
    );
  }
}
