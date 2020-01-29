import React from 'react';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import EpochsSearchResult from '../features/search/ui/EpochsSearchResult';
import { ShrinkedHeaderLayout } from '../widgets/layout/ShrinkedHeaderLayout';
import styles from './epoch.module.scss';

const EpochPage = () => (
  <div className={styles.epochLayout}>
    <BlocksFeatureProvider>
      <EpochsSearchResult />
    </BlocksFeatureProvider>
  </div>
);

EpochPage.getStaticLayout = ShrinkedHeaderLayout;
EpochPage.pageTitle = 'Cardano Explorer | Epoch';

export default EpochPage;
