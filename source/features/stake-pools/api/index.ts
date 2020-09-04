import { GraphQLClient } from 'graphql-request';
import {
  GetStakePoolsQuery,
  GetStakePoolsQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getStakePoolsQuery from './getStakePools.graphql';

export class StakePoolsApi {
  public getStakePoolsQuery: GraphQLRequest<
    GetStakePoolsQuery,
    GetStakePoolsQueryVariables
  >;
  constructor(client: GraphQLClient) {
    this.getStakePoolsQuery = new GraphQLRequest(client, getStakePoolsQuery);
  }
}
