import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import BlockSummary from '../../blocks/ui/BlockSummary';
import { useNavigationFeatureOptionally } from '../../navigation';
import { useNetworkInfoFeature } from '../../network-info/context';
import { useSearchFeature } from '../context';
import NoSearchResult from './NoSearchResult';

export const BlockSearchResult = () => {
  const { actions, store } = useSearchFeature();
  const networkInfo = useNetworkInfoFeature();
  const navigation = useNavigationFeatureOptionally();
  const router = useRouter();

  // Trigger search after component did render
  useEffect(() => {
    const { query } = router;
    if (query?.id) {
      const id = query.id as string;
      actions.searchForBlockById.trigger({ id });
    }
  });
  return (
    <Observer>
      {() => {
        const { blockSearchResult } = store;
        if (store.isSearching) {
          return <LoadingSpinner />;
        } else if (blockSearchResult) {
          return (
            <BlockSummary
              navigation={navigation?.actions}
              networkBlockHeight={networkInfo.store.blockHeight}
              title="Block Summary"
              {...blockSearchResult}
            />
          );
        } else {
          return <NoSearchResult />;
        }
      }}
    </Observer>
  );
};
