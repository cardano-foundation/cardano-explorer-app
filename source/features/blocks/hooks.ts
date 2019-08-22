import { useContext } from 'react';
import { blocksContext } from './contexts';

export const useBlocks = () => {
  const inbox = useContext(blocksContext);
  if (!inbox) {
    throw new Error('You need to setup the inbox context before using it.');
  }
  return inbox;
};
