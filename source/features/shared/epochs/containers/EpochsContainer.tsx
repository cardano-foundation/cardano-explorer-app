import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { EpochsComponentContainer } from './EpochsComponentContainer';

const EpochsContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <EpochsComponentContainer />
  </searchContext.Provider>
);

export default EpochsContainer;
