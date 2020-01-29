import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { CardanoEra } from '../../../constants';
import { environment } from '../../../environment';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import BlocksBrowser from '../../blocks/ui/BlocksBrowser';
import EpochSummary from '../../epochs/ui/EpochSummary';
import StakeDistribution from '../../epochs/ui/StakeDistribution';
import { useNavigationFeature } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import styles from './EpochsSearchResult.module.scss';
import NoSearchResult from './NoSearchResult';

const stakeDistribution = [
  {
    slotsElectedPercentage: 1,
    stakePool: 'Help the USA Cats',
    stakePoolName: 'CATS',
  },
  {
    slotsElectedPercentage: 0.9,
    stakePool: 'Cardano Foundation 1',
    stakePoolName: 'CF1',
  },
  {
    slotsElectedPercentage: 0.78,
    stakePool: 'Blush Pool 1',
    stakePoolName: 'BLS1',
  },
  {
    slotsElectedPercentage: 0.5,
    stakePool: 'Blush Pool 2',
    stakePoolName: 'BLS1',
  },
  {
    slotsElectedPercentage: 0.17,
    stakePool: 'Micro Mining',
    stakePoolName: 'MNG',
  },
  {
    slotsElectedPercentage: 0.08,
    stakePool: 'Saint-Petersburg Acade',
    stakePoolName: 'SPBA',
  },
];

const EpochsSearchResult = () => {
  const { actions, api, store } = useSearchFeature();
  const networkInfo = useNetworkInfoFeature();
  const navigation = useNavigationFeature();
  const { epochSearchResult } = store;
  const { query } = navigation.store;
  const queryEpochNumber = parseInt(query.number as string, 10);

  // Subscribe to epoch results on mounting
  useEffect(() => {
    const { currentEpoch } = networkInfo.store;
    if (currentEpoch && query?.number) {
      if (!epochSearchResult || epochSearchResult.number !== queryEpochNumber) {
        if (currentEpoch === queryEpochNumber) {
          // Subscribe to current epoch data
          actions.subscribeToEpoch.trigger({ number: queryEpochNumber });
        } else {
          // Fetch completed epochs only once
          actions.searchForEpochByNumber.trigger({ number: queryEpochNumber });
        }
      }
    }
  }, [
    networkInfo.store.currentEpoch,
    navigation.store.query,
    store.epochSearchResult,
  ]);

  // Unsubscribe from any epoch on unmounting
  useEffect(
    () => () => {
      actions.unsubscribeFromEpoch.trigger();
    },
    []
  );

  if (
    !api.searchForEpochByNumberQuery.hasBeenExecutedAtLeastOnce ||
    queryEpochNumber !== epochSearchResult?.number
  ) {
    return <LoadingSpinner />;
  } else if (epochSearchResult) {
    return (
      <div className={styles.container}>
        <div className={styles.epochSummary}>
          <EpochSummary title="Epoch Summary" epoch={epochSearchResult} />
        </div>
        <BlocksBrowser
          epoch={epochSearchResult.number}
          perPageDefault={10}
          title="Blocks"
          totalItems={epochSearchResult?.blocksCount}
        />
        {environment.CARDANO.ERA === CardanoEra.SHELLEY ? (
          <div className={styles.stakeDistribution}>
            <StakeDistribution
              title="Stake Distribution"
              items={stakeDistribution}
            />
          </div>
        ) : null}
      </div>
    );
  } else {
    return (
      <NoSearchResult
        searchQuery={navigation.store.query.number as string}
        searchType={SearchType.number}
      />
    );
  }
};

export default observer(EpochsSearchResult);
