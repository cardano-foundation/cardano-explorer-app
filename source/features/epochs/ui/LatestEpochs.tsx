import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useEpochsFeature } from '../context';
import EpochList from './EpochList';

export const LatestEpochs = () => {
  const { actions, store } = useEpochsFeature();
  useEffect(() => {
    actions.fetchLatestEpochs.trigger();
  });
  return (
    <Observer>
      {() => {
        const { latestEpochs } = store;
        return store.isSearching ? (
          <LoadingSpinner />
        ) : (
          <EpochList title="Latest Epochs" items={latestEpochs} />
        );
      }}
    </Observer>
  );
};
