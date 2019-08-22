import React from 'react';
import BlocksSearch from '../components/BlocksSearch';

import { blocksContext } from '../contexts';
import { blocksContextDefault } from '../index';

const InboxContainer = () => (
  <blocksContext.Provider value={blocksContextDefault}>
    <BlocksSearch />
  </blocksContext.Provider>
);

export default InboxContainer;
