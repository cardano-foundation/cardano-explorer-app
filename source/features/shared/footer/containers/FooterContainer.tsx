import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { FooterComponentContainer } from './FooterComponentContainer';

const FooterContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <FooterComponentContainer />
  </searchContext.Provider>
);

export default FooterContainer;
