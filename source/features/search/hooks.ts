import React, { useContext } from 'react';
import { searchContext } from './contexts';

export const useSearch = () => {
  const inbox = useContext(searchContext);
  if (!inbox) {
    throw new Error('You need to setup the inbox context before using it.');
  }
  return inbox;
};

const contextMissingError = new Error(
  'You need to provide the context before using it.'
);

export function ensureContextExists<T>(context: React.Context<T | null>): T {
  const instance = useContext(context);
  if (!instance) {
    throw contextMissingError;
  }
  return instance;
}
