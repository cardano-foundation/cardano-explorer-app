const isNavigatorDefind = typeof navigator !== 'undefined';

export const environment = {
  DEBUG: process.env.DEBUG,
  GRAPHQL_HTTP_URL: `${process.env.GRAPHQL_API_PROTOCOL}://${process.env.GRAPHQL_API_HOST}:${process.env.GRAPHQL_PORT}/`,
  GRAPHQL_WEBSOCKET_URL: `${process.env.GRAPHQL_WEBSOCKET_PROTOCOL}://${process.env.GRAPHQL_WEBSOCKET_HOST}:${process.env.GRAPHQL_PORT}/`,
  IS_CLIENT: isNavigatorDefind,
  IS_SERVER: !isNavigatorDefind,
};
