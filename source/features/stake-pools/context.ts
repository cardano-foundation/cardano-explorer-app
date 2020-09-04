import React, { useContext } from 'react';
import { IStakePoolsFeature } from './index';

/**
 * React context used for this feature
 */
export const stakePoolsContext = React.createContext<IStakePoolsFeature | null>(
  null
);

/**
 * Custom react hook that is used in container components to
 * access the configured feature of the context provider.
 */
export const useStakePools = () => {
  const inbox = useContext(stakePoolsContext);
  if (!inbox) {
    throw new Error('You need to setup the inbox context before using it.');
  }
  return inbox;
};
