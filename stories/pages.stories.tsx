import { storiesOf } from '@storybook/react';
import React from 'react';
import { IndexPage as HaskellIndexPage } from '../source/apps/haskell/index';
import { IndexPage as RustIndexPage } from '../source/apps/rust/index';
import { StakePoolsPage } from '../source/apps/rust/stake-pools';
import { AddressPage } from '../source/apps/shared/address';
import { NoSearchResultsPage } from '../source/apps/shared/no-search-results';
import { OutdatedBrowserPage } from '../source/apps/shared/outdated-browser';

storiesOf('Pages|Rust Client', module)
  .add('Index', () => <RustIndexPage />)
  .add('Stake Pools', () => <StakePoolsPage />);

storiesOf('Pages|Haskell Client', module).add('Index', () => (
  <HaskellIndexPage />
));

storiesOf('Pages|Shared', module)
  .add('Address', () => <AddressPage />)
  .add('No Search Results', () => <NoSearchResultsPage />)
  .add('Outdated Browser', () => <OutdatedBrowserPage />);
