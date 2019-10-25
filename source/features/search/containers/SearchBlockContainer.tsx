import React from 'react';

import { searchContext } from '../contexts';
import { searchContextDefault } from '../index';
import { SearchBlockComponentContainer } from './SearchBlockComponentContainer';

const SearchBlockContainer = () => (
  <searchContext.Provider value={searchContextDefault}>
    <SearchBlockComponentContainer />
  </searchContext.Provider>
);

export default SearchBlockContainer;
