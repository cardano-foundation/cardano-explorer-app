import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React from 'react';
import { useSearchFeature } from '../../search';
import BlockSummary from './BlockSummary';

export const BlocksSearchResult = () => {
  const { actions, store } = useSearchFeature();
  const router = useRouter();
  const { query } = router;
  if (query && query.id) {
    const id = query.id as string;
    actions.searchForBlockById.trigger({ id });
  }
  return (
    <Observer>
      {() => {
        const { blockSearchResult } = store;
        return store.isSearching ? (
          <div>Is searching</div>
        ) : (
          <BlockSummary title="Block Summary" {...blockSearchResult} />
        );
      }}
    </Observer>
  );
};
