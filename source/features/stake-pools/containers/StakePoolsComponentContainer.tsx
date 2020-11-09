import { observer } from 'mobx-react-lite';
import React from 'react';
import Container from '../../../widgets/container/Container';
import StakePools from '../components/StakePools';
import UnmoderatedDataWarning from '../components/UnmoderatedDataWarning';
import { useStakePools } from '../hooks';

export const StakePoolsComponentContainerRaw = () => {
  const { store, actions } = useStakePools();
  const { stakePoolsList, showUnmoderatedData } = store;
  const { handleAcceptUnmoderatedData } = actions;
  if (!showUnmoderatedData) {
    return (
      <UnmoderatedDataWarning
        type="stakePools"
        onAcceptUnmoderatedData={handleAcceptUnmoderatedData.trigger}
      />
    );
  }
  return (
    <Container>
      <StakePools stakePoolsList={stakePoolsList} />
    </Container>
  );
};
export const StakePoolsComponentContainer = observer(
  StakePoolsComponentContainerRaw
);
