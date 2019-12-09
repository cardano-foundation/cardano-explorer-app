import { GraphQLClient } from 'graphql-request';
import { GraphQLRequest } from '../../../lib/graphql/GraphQLRequest';
import {
  CardanoDynamicQuery,
  CardanoStaticQuery,
} from '../../../typings/graphql-schema';
import cardanoDynamic from './cardanoDynamic.graphql';
import cardanoStatic from './cardanoStatic.graphql';

export class NetworkInfoApi {
  public fetchDynamic: GraphQLRequest<CardanoDynamicQuery, {}>;
  public fetchStatic: GraphQLRequest<CardanoStaticQuery, {}>;

  constructor(client: GraphQLClient) {
    this.fetchDynamic = new GraphQLRequest(client, cardanoDynamic);
    this.fetchStatic = new GraphQLRequest(client, cardanoStatic);
  }
}
