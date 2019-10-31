import React, { useState } from 'react';

import Search from '../components/Search';
import { useSearchFeature } from '../index';

export const SearchBar = () => {
  const { actions } = useSearchFeature();
  return <Search onSearch={id => actions.searchForBlockById.trigger({ id })} />;
};
