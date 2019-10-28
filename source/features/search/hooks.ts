import { useContext } from 'react';
import { searchContext } from './contexts';

export const useSearch = () => {
  const inbox = useContext(searchContext);
  if (!inbox) {
    throw new Error('You need to setup the inbox context before using it.');
  }
  return inbox;
};
