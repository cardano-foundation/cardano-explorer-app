import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { TransactionComponentContainer } from './TransactionComponentContainer';

const TransactionContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <TransactionComponentContainer />
  </searchContext.Provider>
);

export default TransactionContainer;
