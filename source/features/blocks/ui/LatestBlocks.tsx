import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import ShowMoreButtonDecorator from '../../../widgets/decorators/ShowMoreButtonDecorator';
import LoadingSpinner from '../../../widgets/loading-spinner/LoadingSpinner';
import { useI18nFeature } from '../../i18n/context';
import { useNavigationFeature } from '../../navigation';
import { BLOCK_BROWSE_PATH } from '../config';
import { useBlocksFeature } from '../context';
import BlockList from './BlockList';
import styles from './LatestBlocks.module.scss';

export const LatestBlocks = () => {
  const { translate } = useI18nFeature().store;
  const { actions, store } = useBlocksFeature();
  const navigation = useNavigationFeature();
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
            href={BLOCK_BROWSE_PATH}
            label={translate('latestBlocks.showMore')}
            isHidden={
              store.isLoadingLatestBlocksFirstTime ||
              store.latestBlocks.length < 10
            }
          >
            <BlockList
              isLoading={store.isLoadingLatestBlocksFirstTime}
              items={latestBlocks}
              title={translate('latestBlocks.pageTitle')}
            />
            {store.isLoadingLatestBlocksFirstTime && (
              <LoadingSpinner className={styles.loadingSpinnerMargin} />
            )}
          </ShowMoreButtonDecorator>
        );
      }}
    </Observer>
  );
};
