import { observer } from 'mobx-react-lite';
import React from 'react';
import StakePools from '../components/StakePools';
import UnmoderatedDataWarning from '../components/UnmoderatedDataWarning';
import { useStakePools } from '../hooks';
import Container from '../../widgets/container/components/Container';

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

  return (
    <Container>
      <StakePools stakePoolsList={stakePoolsList} />
    </Container>
  );
};
export const StakePoolsComponentContainer = observer(
  StakePoolsComponentContainerRaw
);
