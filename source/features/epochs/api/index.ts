import { GraphQLClient } from 'graphql-request';
import {
  GetEpochsInRangeQuery,
  GetEpochsInRangeQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getEpochsInRangeQuery from './getEpochsInRange.graphql';

export class EpochsApi {
  public getEpochsInRangeQuery: GraphQLRequest<
    GetEpochsInRangeQuery,
    GetEpochsInRangeQueryVariables
  >;
  constructor(client: GraphQLClient) {
    this.getEpochsInRangeQuery = new GraphQLRequest(
      client,
      getEpochsInRangeQuery
    );
  }
}
