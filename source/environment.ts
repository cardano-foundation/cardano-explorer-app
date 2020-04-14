import debug from 'debug';
import { CardanoEra, CardanoNetwork } from './constants';

const isNavigatorDefined = typeof navigator !== 'undefined';

export const environment = {
  CARDANO: {
    ERA: (process.env.CARDANO_ERA as CardanoEra) || CardanoEra.BYRON,
    GRAPHQL: {
      HTTP_URL: `${process.env.GRAPHQL_API_PROTOCOL || 'https'}://${process.env
        .GRAPHQL_API_HOST ||
        'cardano-graphql-mainnet.daedalus-operations.com'}:${process.env
        .GRAPHQL_API_PORT || '443'}/${process.env.GRAPHQL_API_PATH || ''}`,
    },
    NETWORK:
      (process.env.CARDANO_NETWORK as CardanoNetwork) || CardanoNetwork.MAINNET,
  },
  DEBUG: process.env.DEBUG,
  GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  IS_CLIENT: isNavigatorDefined,
  IS_SERVER: !isNavigatorDefined,
  REAL_TIME_FACTOR: Number(process.env.REAL_TIME_FACTOR || '1.5'),
};

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}
