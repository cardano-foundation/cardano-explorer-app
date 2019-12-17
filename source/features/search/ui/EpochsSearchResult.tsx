import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { CardanoEra } from '../../../constants';
import { environment } from '../../../environment';
import ShowMoreButtonDecorator from '../../../widgets/decorators/ShowMoreButtonDecorator';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import BlockList from '../../blocks/ui/BlockList';
import BlocksBrowser from '../../blocks/ui/BlocksBrowser';
import EpochSummary from '../../epochs/ui/EpochSummary';
import StakeDistribution from '../../epochs/ui/StakeDistribution';
import { useSearchFeature } from '../context';
import { SearchType } from '../store';
import styles from './EpochsSearchResult.scss';
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

export const EpochsSearchResult = () => {
  const { actions, api, store } = useSearchFeature();
  const router = useRouter();

  // Trigger search after component did render
  useEffect(() => {
    const { query } = router;
    const { epochSearchResult } = store;
    if (query?.number) {
      const num = parseInt(query.number as string, 10);
      if (!epochSearchResult || epochSearchResult.number !== num) {
        console.log('searchForEpochByNumber.trigger');
        actions.searchForEpochByNumber.trigger({ number: num });
      }
    }
  }, [router.query, store.epochSearchResult]);
  return (
    <Observer>
      {() => {
        const { epochSearchResult } = store;
        if (
          !api.searchForEpochByNumberQuery.hasBeenExecutedAtLeastOnce ||
          store.isSearching
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
              searchQuery={router.query?.number as string}
              searchType={SearchType.number}
            />
          );
        }
      }}
    </Observer>
  );
};
