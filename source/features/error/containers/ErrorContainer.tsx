import React from 'react';

import { searchContext } from '../contexts';
import { blocksContextDefault } from '../index';
import { ErrorComponentContainer } from './ErrorComponentContainer';

const ErrorContainer = () => (
  <searchContext.Provider value={blocksContextDefault}>
    <ErrorComponentContainer />
  </searchContext.Provider>
);

export default ErrorContainer;
