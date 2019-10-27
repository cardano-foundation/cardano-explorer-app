import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import createDebug from 'debug';
import fetch from 'node-fetch';
import { environment } from '../../environment';

const debug = createDebug('Explorer:apolloClient');

// Queries are made over HTTP
const httpLink = createHttpLink({
  fetch: fetch as any,
  uri: environment.CARDANO.GRAPHQL.HTTP_URL,
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
    },
  },
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
          `[GraphQL network error]: could not connect to ${environment.CARDANO.GRAPHQL.HTTP_URL}.`
        );
      }
    }),
    httpLink,
  ]),
});
