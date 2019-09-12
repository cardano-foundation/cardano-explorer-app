import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { OutdatedBrowserComponentContainer } from './OutdatedBrowserComponentContainer';

const OutdatedBrowserContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <OutdatedBrowserComponentContainer />
  </searchContext.Provider>
);

export default OutdatedBrowserContainer;
