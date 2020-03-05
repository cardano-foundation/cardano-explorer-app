import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import ShowMoreButtonDecorator from '../../../widgets/decorators/ShowMoreButtonDecorator';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useNavigationFeature } from '../../navigation';
import { EPOCH_BROWSE_PATH } from '../config';
import { useEpochsFeature } from '../context';
import EpochList from './EpochList';
import styles from './LatestEpochs.module.scss';

export const LatestEpochs = () => {
  const { actions, store } = useEpochsFeature();
  const navigation = useNavigationFeature();
  useEffect(() => {
    // Start fetching latest blocks on mount
    actions.startPollingLatestEpochs.trigger();
    // Stop fetching latest blocks on unmount
    return () => {
      actions.stopPollingLatestEpochs.trigger();
    };
  }, []);
  return (
    <Observer>
      {() => {
        const { latestEpochs } = store;
        return (
          <ShowMoreButtonDecorator
            label={'show more'}
            isHidden={
              store.isLoadingLatestEpochsFirstTime ||
              store.latestEpochs.length < 5
            }
            onClick={() =>
              navigation.actions.push.trigger({ path: EPOCH_BROWSE_PATH })
            }
          >
            <EpochList
              currentEpoch={store.currentEpochNumber}
              title="Latest Epochs"
              items={latestEpochs}
              isLoading={store.isLoadingLatestEpochsFirstTime}
            />
            {store.isLoadingLatestEpochsFirstTime && (
              <LoadingSpinner className={styles.loadingSpinnerMargin} />
            )}
          </ShowMoreButtonDecorator>
        );
      }}
    </Observer>
  );
};
