import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { BlocksSearchFormContainer } from './BlocksSearchFormContainer';

const BlocksSearchContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <BlocksSearchFormContainer />
  </searchContext.Provider>
);

export default BlocksSearchContainer;
