import React, { useState } from 'react';
import { useObservableEffect } from '../../../../lib/mobx/react';
import { useStakePools } from '../../context';
import UnmoderatedDataWarning from '../consent/UnmoderatedDataWarning';
import StakePools from './StakePools';

export const StakePoolsContainer = () => {
  const { store, actions } = useStakePools();
  const { stakePoolsList } = store;
  const { handleAcceptUnmoderatedData } = actions;
  const [showUnmoderatedData, setShowUnmoderatedData] = useState(
    store.showUnmoderatedData
  );

  // Observe and update consent flag
  useObservableEffect(() => {
    setShowUnmoderatedData(store.showUnmoderatedData);
  });

  if (!showUnmoderatedData) {
    return (
      <UnmoderatedDataWarning
        onAcceptUnmoderatedData={handleAcceptUnmoderatedData.trigger}
      />
    );
  }
  return <StakePools stakePoolsList={stakePoolsList} />;
};
