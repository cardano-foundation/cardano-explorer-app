import { observer } from 'mobx-react-lite';
import React from 'react';
import Epoch from '../components/Epoch';
import { useBlocks } from '../hooks';
import Address from '../../../address/components/Address';

export const EpochComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return <Epoch propFirst={''} propSecond={''} />;
};

export const EpochComponentContainer = observer(EpochComponentContainerRaw);
