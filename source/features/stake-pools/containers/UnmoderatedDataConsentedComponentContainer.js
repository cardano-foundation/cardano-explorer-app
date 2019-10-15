import { observer } from 'mobx-react-lite';
import React from 'react';
import Container from '../../widgets/container/components/Container';
import StakePools from '../components/StakePools';
import UnmoderatedDataConsented from '../components/UnmoderatedDataConsented';
import { useStakePools } from '../hooks';

export const UnmoderatedDataConsentedComponentContainerRaw = () => {
  const { store, actions } = useStakePools();
  const { showUnmoderatedData } = store;
  const { handleHideUnmoderatedData } = actions;
  if (showUnmoderatedData) {
    return (
      <UnmoderatedDataConsented
        onHideUnmoderatedData={handleHideUnmoderatedData.trigger}
      />
    );
  }
  return null;
};
export const UnmoderatedDataConsentedComponentContainer = observer(
  UnmoderatedDataConsentedComponentContainerRaw
);
