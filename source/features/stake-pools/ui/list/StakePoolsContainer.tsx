import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useStakePools } from '../../context';
import UnmoderatedDataWarning from '../consent/UnmoderatedDataWarning';
import StakePools from './StakePools';

export const StakePoolsContainer = () => {
  const stakePools = useStakePools();
  const { handleAcceptUnmoderatedData } = stakePools.actions;

  return (
    <Observer>
      {() =>
        stakePools.store.showUnmoderatedData ? (
          <StakePools stakePoolsList={stakePools.store.stakePoolsList} />
        ) : (
          <UnmoderatedDataWarning
            onAcceptUnmoderatedData={handleAcceptUnmoderatedData.trigger}
          />
        )
      }
    </Observer>
  );
};
