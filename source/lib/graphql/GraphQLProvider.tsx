import { GraphQLClient } from 'graphql-request';
import React from 'react';
import { ensureContextExists } from '../react/hooks';
import { graphqlClient } from './graphqlClient';

interface IProps {
  children: React.ReactNode;
}

/**
 * The React context that holds the GraphQLClient instance
 */
export const graphQLClientContext = React.createContext<GraphQLClient | null>(
  null
);
/**
 * Custom react hook to access the GraphQLClient instance
 */
export const useGraphQLClient = () => ensureContextExists(graphQLClientContext);

export default ({ children }: IProps) => (
  <graphQLClientContext.Provider value={graphqlClient}>
    {children}
  </graphQLClientContext.Provider>
);
