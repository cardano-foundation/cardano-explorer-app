import React from 'react';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import EpochsBrowser from '../features/epochs/ui/EpochsBrowser';
import { EpochsFeatureProvider } from '../features/epochs/ui/EpochsFeatureProvider';
import { ShrinkedHeaderLayout } from '../widgets/layout/ShrinkedHeaderLayout';

const BrowseEpochsPage = () => (
  <BlocksFeatureProvider>
    <EpochsFeatureProvider>
      <EpochsBrowser />
    </EpochsFeatureProvider>
  </BlocksFeatureProvider>
);

BrowseEpochsPage.getStaticLayout = ShrinkedHeaderLayout;
BrowseEpochsPage.pageTitle = 'Cardano Explorer | Browse Epochs';

export default BrowseEpochsPage;
