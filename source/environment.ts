const isNavigatorDefind = typeof navigator !== 'undefined';

export const environment = {
  DEBUG: process.env.DEBUG,
  GRAPHQL_HTTP_URL: process.env.GRAPHQL_HTTP_URL,
  GRAPHQL_WEBSOCKET_URL: process.env.GRAPHQL_WEBSOCKET_URL,
  IS_CLIENT: isNavigatorDefind,
  IS_SERVER: !isNavigatorDefind,
};
