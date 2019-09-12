import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { EpochComponentContainer } from './EpochComponentContainer';

const EpochContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <EpochComponentContainer />
  </searchContext.Provider>
);

export default EpochContainer;
