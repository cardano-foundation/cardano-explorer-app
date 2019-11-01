import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BlockSummary from '../../blocks/ui/BlockSummary';
import { useSearchFeature } from '../index';

export const BlocksSearchResult = () => {
  const { actions, store } = useSearchFeature();
  const router = useRouter();

  // Trigger search after component did render
  useEffect(() => {
    const { query } = router;
    if (query && query.id) {
      const id = query.id as string;
      actions.searchForBlockById.trigger({ id });
    } else if (query && query.number) {
      const num = parseInt(query.number as string, 10);
      actions.searchForBlockByNumber.trigger({ number: num });
    }
  });
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
