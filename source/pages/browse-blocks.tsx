import React from 'react';
import BlocksBrowser from '../features/blocks/ui/BlocksBrowser';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import { ShrinkedHeaderLayout } from '../widgets/layout/ShrinkedHeaderLayout';

const BrowseBlocksPage = () => (
  <BlocksFeatureProvider>
    <BlocksBrowser title="Browse Blocks" />
  </BlocksFeatureProvider>
);

BrowseBlocksPage.getStaticLayout = ShrinkedHeaderLayout;
BrowseBlocksPage.pageTitle = 'Cardano Explorer | Browse Blocks';

export default BrowseBlocksPage;
