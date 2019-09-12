import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { AddressComponentContainer } from './AddressComponentContainer';

const AddressContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <AddressComponentContainer />
  </searchContext.Provider>
);

export default AddressContainer;
