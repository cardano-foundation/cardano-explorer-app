import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { SearchFormContainer } from './SearchFormContainer';

const SearchContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <SearchFormContainer />
  </searchContext.Provider>
);

export default SearchContainer;
