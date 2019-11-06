import { Observer } from 'mobx-react-lite';
import React from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useEpochsFeature } from '../context';
import EpochList from './EpochList';

export const LatestEpochs = () => {
  const { store } = useEpochsFeature();
  return (
    <Observer>
      {() => {
        const { latestEpochs } = store;
        return (
          <>
            <EpochList
              title="Latest Epochs"
              items={latestEpochs}
              isLoading={store.isLoadingFirstTime}
            />
            {store.isLoadingFirstTime && <LoadingSpinner />}
          </>
        );
      }}
    </Observer>
  );
};
