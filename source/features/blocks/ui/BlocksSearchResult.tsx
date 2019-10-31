import { Observer } from 'mobx-react-lite';
import React from 'react';
import { useSearchFeature } from '../../search';
import BlockSummary from './BlockSummary';

export const BlocksSearchResult = () => {
  const { store } = useSearchFeature();

  return (
    <Observer>
      {() => {
        // tslint:disable-next-line:no-console
        console.log(store.blockSearchResult);
        return store.isSearching ? (
          <div>Is searching</div>
        ) : (
          <BlockSummary title="Block Summary" {...store.blockSearchResult} />
        );
      }}
    </Observer>
  );
};
