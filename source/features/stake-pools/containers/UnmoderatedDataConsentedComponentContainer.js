import { observer } from 'mobx-react-lite';
import React from 'react';
import Container from '../../widgets/container/components/Container';
import StakePools from '../components/StakePools';
import UnmoderatedDataConsented from '../components/UnmoderatedDataConsented';
import { useStakePools } from '../hooks';

export const UnmoderatedDataConsentedComponentContainerRaw = () => {
  const { store } = useStakePools();
  const { showUnmoderatedData } = store;
  if (showUnmoderatedData) {
    return (
      <UnmoderatedDataConsented />
    );
  }
  return null;
};
export const UnmoderatedDataConsentedComponentContainer = observer(
  UnmoderatedDataConsentedComponentContainerRaw
);
