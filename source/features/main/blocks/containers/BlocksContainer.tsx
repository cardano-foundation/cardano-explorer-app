import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { BlocksComponentContainer } from './BlocksComponentContainer';

const BlocksContainer = () => (
  <searchContext.Provider value={blocksContextDefault}></searchContext.Provider>
);

export default BlocksContainer;
