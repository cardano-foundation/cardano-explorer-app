import { useContext } from 'react';
import { stakePoolsContext } from './contexts';

export const useStakePools = () => {
  const inbox = useContext(stakePoolsContext);
  if (!inbox) {
    throw new Error('You need to setup the inbox context before using it.');
  }
  return inbox;
};
