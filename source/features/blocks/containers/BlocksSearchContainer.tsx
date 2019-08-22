import React from 'react';

import { blocksContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { BlocksSearchFormContainer } from './BlocksSearchFormContainer';

const BlocksSearchContainer = () => (
  <blocksContext.Provider value={blocksContextDefault}>
    <BlocksSearchFormContainer />
  </blocksContext.Provider>
);

export default BlocksSearchContainer;
