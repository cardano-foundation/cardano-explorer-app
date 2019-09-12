import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { BlockComponentContainer } from './BlockComponentContainer';

const BlockContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <BlockComponentContainer />
  </searchContext.Provider>
);

export default BlockContainer;
