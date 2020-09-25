import { GraphQLClient } from 'graphql-request';
import {
  GetStakePoolsAggregateQuery,
  GetStakePoolsAggregateQueryVariables,
  GetStakePoolsQuery,
  GetStakePoolsQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getStakePoolsQuery from './getStakePools.graphql';
import getStakePoolsAggregateQuery from './getStakePoolsAggregate.graphql';

export class StakePoolsApi {
  public getStakePoolsQuery: GraphQLRequest<
    GetStakePoolsQuery,
    GetStakePoolsQueryVariables
  >;
  public getStakePoolsAggregateQuery: GraphQLRequest<
    GetStakePoolsAggregateQuery,
    GetStakePoolsAggregateQueryVariables
  >;
  constructor(client: GraphQLClient) {
    this.getStakePoolsQuery = new GraphQLRequest(client, getStakePoolsQuery);
    this.getStakePoolsAggregateQuery = new GraphQLRequest(
      client,
      getStakePoolsAggregateQuery
    );
  }
}
