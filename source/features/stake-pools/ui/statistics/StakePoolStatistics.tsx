import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useNetworkInfoFeature } from '../../../network-info/context';
import { StakePoolStatisticsPanel } from './StakePoolStatisticsPanel';

export const StakePoolsStatistics = () => {
  // const { store, actions } = useStakePools();
  const networkInfo = useNetworkInfoFeature();
  return (
    <Observer>
      {() => (
        <StakePoolStatisticsPanel
          epochNumber={networkInfo.store.currentEpoch}
          epochProgressPercentage={
            networkInfo.store.currentEpochPercentageComplete
          }
          numberOfStakePools={841}
          rewardsPreviousEpoch={7170431}
          rewardsTotal={927070538}
          stakeControlledPercentage={76.43}
        />
      )}
    </Observer>
  );
};
