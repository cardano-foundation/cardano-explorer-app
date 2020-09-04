import React from 'react';
import { useStakePools } from '../../context';
import { StakePoolStatisticsPanel } from './StakePoolStatisticsPanel';

export const StakePoolsStatistics = () => {
  // const { store, actions } = useStakePools();
  return (
    <StakePoolStatisticsPanel
      numberOfStakePools={841}
      rewardsPreviousEpoch={7170431}
      rewardsTotal={927070538}
      stakeControlledPercentage={76.43}
    />
  );
};
