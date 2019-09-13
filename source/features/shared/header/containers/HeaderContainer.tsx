import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { HeaderComponentContainer } from './HeaderComponentContainer';

const HeaderContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <HeaderComponentContainer />
  </searchContext.Provider>
);

export default HeaderContainer;
