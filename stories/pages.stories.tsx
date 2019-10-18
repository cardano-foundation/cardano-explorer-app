import { storiesOf } from '@storybook/react';
import React from 'react';
import IndexPage, { AddressPage, StakePoolsPage } from '../source/pages';

storiesOf('Pages', module)
  .add('Main Page', () => <IndexPage />)
  .add('Address Page', () => <AddressPage />)
  .add('Stake Pools Page', () => <StakePoolsPage />);
