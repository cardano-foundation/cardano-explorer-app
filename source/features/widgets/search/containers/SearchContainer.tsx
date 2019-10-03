import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { SearchComponentContainer } from './SearchComponentContainer';

const SearchContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <SearchComponentContainer />
  </searchContext.Provider>
);

export default SearchContainer;
