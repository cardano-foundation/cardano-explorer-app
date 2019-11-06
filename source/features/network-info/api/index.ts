import ApolloClient from 'apollo-client';

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

  constructor(client: ApolloClient<any>) {
    this.fetchDynamic = new GraphQLRequest(client, cardanoDynamic);
    this.fetchStatic = new GraphQLRequest(client, cardanoStatic);
  }
}
