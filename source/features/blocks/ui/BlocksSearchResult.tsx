import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React from 'react';
import { useSearchFeature } from '../../search';
import BlockSummary from './BlockSummary';

export const BlocksSearchResult = () => {
  const { actions, store } = useSearchFeature();
  const router = useRouter();
  const id = router.query.id ? router.query.id.toString() : '';
  if (id) {
    actions.searchForBlockById.trigger({ id });
  }

  return (
    <Observer>
      {() => {
        const result = store.blockSearchResult;
        return store.isSearching ? (
          <div>Is searching</div>
        ) : (
          <BlockSummary title="Block Summary" {...result} />
        );
      }}
    </Observer>
  );
};
