import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { SearchBlockComponentContainer } from './SearchBlockComponentContainer';

const SearchBlockContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <SearchBlockComponentContainer />
  </searchContext.Provider>
);

export default SearchBlockContainer;
