import { observer } from 'mobx-react-lite';
import React from 'react';
import UnmoderatedDataConsented from '../components/UnmoderatedDataConsented';
import { useStakePools } from '../hooks';

export const UnmoderatedDataConsentedComponentContainerRaw = () => {
  const { store } = useStakePools();
  const { showUnmoderatedData } = store;
  if (showUnmoderatedData) {
    return (
      <UnmoderatedDataConsented type="stakePools"/>
    );
  }
  return null;
};
export const UnmoderatedDataConsentedComponentContainer = observer(
  UnmoderatedDataConsentedComponentContainerRaw
);
