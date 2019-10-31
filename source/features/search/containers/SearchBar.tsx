import React, { useState } from 'react';

import { useFeature } from '../../../lib/react/hooks';
import Search from '../components/Search';
import {
  createSearchFeature,
  ISearchFeature,
  searchContext,
  useSearchFeature,
} from '../index';

export const SearchContainer = () => {
  const { actions } = useSearchFeature();
  return <Search onSearch={id => actions.searchForBlockById.trigger({ id })} />;
};

export const SearchBar = () => {
  const [blocksFeature] = useState<ISearchFeature>(createSearchFeature());
  useFeature(blocksFeature);
  return (
    <searchContext.Provider value={blocksFeature}>
      <SearchContainer />
    </searchContext.Provider>
  );
};
