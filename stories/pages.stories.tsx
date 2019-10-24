import { storiesOf } from '@storybook/react';
import React from 'react';
import { IndexPage as ByronIndexPage } from '../source/apps/byron/index';
import { AddressPage } from '../source/apps/shared/address';
import { EpochPage } from '../source/apps/shared/epoch';
import { NoSearchResultsPage } from '../source/apps/shared/no-search-results';
import { OutdatedBrowserPage } from '../source/apps/shared/outdated-browser';
import { IndexPage as ShelleyIndexPage } from '../source/apps/shelley/index';
import { StakePoolsPage } from '../source/apps/shelley/stake-pools';

storiesOf('Pages|Shelley Client', module)
  .add('Index', () => <ShelleyIndexPage />)
  .add('Stake Pools', () => <StakePoolsPage />);

storiesOf('Pages|Byron Client', module).add('Index', () => <ByronIndexPage />);

storiesOf('Pages|Shared', module)
  .add('Address', () => <AddressPage />)
  .add('No Search Results', () => <NoSearchResultsPage />)
  .add('Outdated Browser', () => <OutdatedBrowserPage />)
  .add('Epoch', () => <EpochPage />);
