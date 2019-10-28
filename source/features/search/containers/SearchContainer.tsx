import React from 'react';

import { searchContext } from '../contexts';
import { searchContextDefault } from '../index';
import { SearchComponentContainer } from './SearchComponentContainerRaw';

const SearchContainer = () => (
  <searchContext.Provider value={searchContextDefault}>
    <SearchComponentContainer />
  </searchContext.Provider>
);

export default SearchContainer;
