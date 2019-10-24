import { storiesOf } from '@storybook/react';
import React from 'react';
import IndexPage, { AddressPage, StakePoolsPage } from '../source/pages';
import BlockPage from '../source/pages/block';
import EpochPage from '../source/pages/epoch';
import ErrorPage from '../source/pages/error';
import OutdatedBrowserPage from '../source/pages/outdated-browser';
import TransactionPage from '../source/pages/transaction';

storiesOf('Pages', module)
  .add('Address Page', () => <AddressPage />)
  .add('Block Page', () => <BlockPage />)
  .add('Epoch Page', () => <EpochPage />)
  .add('Error Page', () => <ErrorPage />)
  .add('Main Page', () => <IndexPage />)
  .add('Outdated Browser Page', () => <OutdatedBrowserPage />)
  .add('Stake Pools Page', () => <StakePoolsPage />)
  .add('Transaction Page', () => <TransactionPage />);
