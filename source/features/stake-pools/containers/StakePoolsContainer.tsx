import React from 'react';

import { stakePoolsContext } from '../contexts';
import { stakePoolsContextDefault } from '../index';
import { StakePoolsComponentContainer } from './StakePoolsComponentContainer';

const StakePoolsContainer = () => (
  <stakePoolsContext.Provider value={stakePoolsContextDefault}>
    <StakePoolsComponentContainer />
  </stakePoolsContext.Provider>
);

export default StakePoolsContainer;
