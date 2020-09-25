import { Observer } from 'mobx-react-lite';
import React from 'react';
import LoadingSpinner from '../../../../widgets/loading-spinner/LoadingSpinner';
import { useNetworkInfoFeature } from '../../../network-info/context';
import { useStakePools } from '../../context';
import { StakePoolStatisticsPanel } from './StakePoolStatisticsPanel';

export const StakePoolsStatistics = () => {
  const stakePools = useStakePools();
  const networkInfo = useNetworkInfoFeature();
  return (
    <Observer>
      {() => {
        const { stakePoolsStatistics } = stakePools.store;
        if (stakePoolsStatistics == null) {
          return <LoadingSpinner />;
        } else {
          return (
            <StakePoolStatisticsPanel
              epochNumber={networkInfo.store.currentEpoch}
              epochProgressPercentage={
                networkInfo.store.currentEpochPercentageComplete
              }
              numberOfStakePools={parseInt(stakePoolsStatistics.count)}
              // rewardsPreviousEpoch={7170431}
              // rewardsTotal={927070538}
              // stakeControlledPercentage={76.43}
            />
          );
        }
      }}
    </Observer>
  );
};
