import React from 'react';
import { ApolloProvider } from 'react-apollo-hooks';
import { apolloClient } from './apolloClient';

interface IProps {
  children: React.ReactNode;
}

export default ({ children }: IProps) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);
