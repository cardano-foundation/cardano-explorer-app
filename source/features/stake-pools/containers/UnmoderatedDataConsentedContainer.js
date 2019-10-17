import React from 'react';

import { stakePoolsContext } from '../contexts';
import { stakePoolsContextDefault } from '../index';
import { UnmoderatedDataConsentedComponentContainer } from './UnmoderatedDataConsentedComponentContainer';

const UnmoderatedDataConsentedContainer = () => (
  <stakePoolsContext.Provider value={stakePoolsContextDefault}>
    <UnmoderatedDataConsentedComponentContainer />
  </stakePoolsContext.Provider>
);

export default UnmoderatedDataConsentedContainer;
