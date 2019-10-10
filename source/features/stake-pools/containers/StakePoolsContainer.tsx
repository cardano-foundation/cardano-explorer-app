import React from 'react';

import { stakePoolsContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { StakePoolsComponentContainer } from './StakePoolsComponentContainer';

const StakePoolsContainer = () => (
  <stakePoolsContext.Provider value={blocksContextDefault}>
    <StakePoolsComponentContainer />
  </stakePoolsContext.Provider>
);

export default StakePoolsContainer;
