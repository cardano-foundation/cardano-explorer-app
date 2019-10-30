import ApolloClient from 'apollo-client';
import {
  GetLatestEpochsQuery,
  GetLatestEpochsQueryVariables,
} from '../../../../generated/typings/graphql-schema';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import getLatestEpochsQuery from './getLatestEpochs.graphql';

export class EpochsApi {
  public getLatestEpochsQuery: GraphQLRequest<
    GetLatestEpochsQuery,
    GetLatestEpochsQueryVariables
  >;
  constructor(client: ApolloClient<any>) {
    this.getLatestEpochsQuery = new GraphQLRequest(
      client,
      getLatestEpochsQuery
    );
  }
}
