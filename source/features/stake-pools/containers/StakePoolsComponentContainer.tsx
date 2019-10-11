import { observer } from 'mobx-react-lite';
import React from 'react';
import StakePools from '../components/StakePools';
import UnmoderatedDataWarning from '../components/UnmoderatedDataWarning';
import { useStakePools } from '../hooks';

export const StakePoolsComponentContainerRaw = () => {
  const { store, actions } = useStakePools();
  const { stakePoolsList, showUnmoderatedData } = store;
  const { handleAcceptUnmoderatedData } = actions;

  if (!showUnmoderatedData)
    return (
      <UnmoderatedDataWarning
        onAcceptUnmoderatedData={handleAcceptUnmoderatedData.trigger}
      />
    );

  return <StakePools stakePoolsList={stakePoolsList} />;
};
export const StakePoolsComponentContainer = observer(
  StakePoolsComponentContainerRaw
);
