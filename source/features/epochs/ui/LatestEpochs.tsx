import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useEpochsFeature } from '../index';
import EpochList from './EpochList';

export const LatestEpochs = () => {
  const { actions, store } = useEpochsFeature();
  useEffect(() => {
    actions.fetchLatestEpochs.trigger();
  });
  return (
    <Observer>
      {() => <EpochList title="Latest Epochs" items={store.latestEpochs} />}
    </Observer>
  );
};
