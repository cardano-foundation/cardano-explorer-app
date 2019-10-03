import { observer } from 'mobx-react-lite';
import React from 'react';
import StakePools from '../components/StakePools';
import { useStakePools } from '../hooks';

export const StakePoolsComponentContainerRaw = () => {
  const { store } = useStakePools();
  const { stakePoolsList } = store;

  return <StakePools stakePoolsList={stakePoolsList} />;
};
export const StakePoolsComponentContainer = observer(
  StakePoolsComponentContainerRaw
);
