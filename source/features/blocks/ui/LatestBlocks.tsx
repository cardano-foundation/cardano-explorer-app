import { Observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import ShowMoreButtonDecorator from '../../../widgets/decorators/ShowMoreButtonDecorator';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useBlocksFeature } from '../context';
import BlockList from './BlockList';

export const LatestBlocks = () => {
  const { actions, store } = useBlocksFeature();
  const router = useRouter();
  useEffect(() => {
    // Start fetching latest blocks on mount
    actions.startPollingLatestBlocks.trigger();
    // Stop fetching latest blocks on unmount
    return () => {
      actions.stopPollingLatestBlocks.trigger();
    };
  }, []);
  return (
    <Observer>
      {() => {
        const { latestBlocks } = store;
        return (
          <ShowMoreButtonDecorator
            label={'show more'}
            isHidden={
              store.isLoadingLatestBlocksFirstTime ||
              store.latestBlocks.length < 10
            }
            onClick={() =>
              router.push(
                `/browse-blocks?lower=${
                  latestBlocks[latestBlocks.length - 1].number
                }&upper=${latestBlocks[0].number}`
              )
            }
          >
            <BlockList
              isLoading={store.isLoadingLatestBlocksFirstTime}
              items={latestBlocks}
              title="Latest Blocks"
            />
            {store.isLoadingLatestBlocksFirstTime && <LoadingSpinner />}
          </ShowMoreButtonDecorator>
        );
      }}
    </Observer>
  );
};
