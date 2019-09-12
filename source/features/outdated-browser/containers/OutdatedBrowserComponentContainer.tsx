import { observer } from 'mobx-react-lite';
import React from 'react';
import OutdatedBrowser from '../components/OutdatedBrowser';
import { useBlocks } from '../hooks';

export const OutdatedBrowserComponentContainerRaw = () => {
  const { actions, store } = useBlocks();
  return <OutdatedBrowser propFirst={''} propSecond={''} />;
};

export const OutdatedBrowserComponentContainer = observer(
  OutdatedBrowserComponentContainerRaw
);
