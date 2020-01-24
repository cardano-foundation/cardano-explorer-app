import debug from 'debug';
import { CardanoEra, CardanoNetwork } from './constants';

const isNavigatorDefined = typeof navigator !== 'undefined';

export const environment = {
  CARDANO: {
    ERA: (process.env.CARDANO_ERA as CardanoEra) || CardanoEra.BYRON,
    GRAPHQL: {
      HTTP_URL: `${process.env.GRAPHQL_API_PROTOCOL || 'http'}://${process.env
        .GRAPHQL_API_HOST || 'localhost'}:${process.env.GRAPHQL_API_PORT ||
        '3100'}/${process.env.GRAPHQL_API_PATH || ''}`,
    },
    NETWORK:
      (process.env.CARDANO_NETWORK as CardanoNetwork) || CardanoNetwork.MAINNET,
  },
  DEBUG: process.env.DEBUG,
  IS_CLIENT: isNavigatorDefined,
  IS_SERVER: !isNavigatorDefined,
  REAL_TIME_FACTOR: Number(process.env.REAL_TIME_FACTOR || '1.5'),
};

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}
