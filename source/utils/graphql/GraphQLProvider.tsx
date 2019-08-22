import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import createDebug from 'debug';
import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { environment } from '../../environment';

const debug = createDebug('Explorer:GraphQLProvider');

if (!environment.GRAPHQL_WEBSOCKET_URL) {
  throw new Error('GRAPHQL_WEBSOCKET_URL env var is required.');
}

if (!environment.GRAPHQL_HTTP_URL) {
  throw new Error('GRAPHQL_HTTP_URL env var is required.');
}

// Queries are made over HTTP
const httpLink = createHttpLink({
  uri: environment.GRAPHQL_HTTP_URL,
});

// Subscriptions are setup with Websockets
const wsLink = new WebSocketLink({
  options: {
    lazy: true,
    reconnect: true,
  },
  uri: environment.GRAPHQL_WEBSOCKET_URL,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          debug(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        debug(
          `[GraphQL network error]: could not connect to ${environment.GRAPHQL_HTTP_URL}.`
        );
      }
    }),
    // Split network requests depending on the type (subscriptions / queries)
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink
    ),
  ]),
});

interface IProps {
  children: React.ReactNode;
}

export default ({ children }: IProps) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);
