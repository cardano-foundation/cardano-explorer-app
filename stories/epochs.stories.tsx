import { storiesOf } from '@storybook/react';
import React from 'react';
import { latestEpochsExample } from '../source/features/epochs/specs/helpers/latestEpochsExample';
import EpochList from '../source/features/epochs/ui/EpochList';
import EpochSummary from '../source/features/epochs/ui/EpochSummary';
import StakeDistribution from '../source/features/epochs/ui/StakeDistribution';
import { PaddingDecorator } from './support/PaddingDecorator';

const epochs = latestEpochsExample;

const stakeDistribution = [
  {
    slotsElectedPercentage: 1,
    stakePool: 'Help the USA Cats',
    stakePoolName: 'CATS',
  },
  {
    slotsElectedPercentage: 0.9,
    stakePool: 'Cardano Foundation 1',
    stakePoolName: 'CF1',
  },
  {
    slotsElectedPercentage: 0.78,
    stakePool: 'Blush Pool 1',
    stakePoolName: 'BLS1',
  },
  {
    slotsElectedPercentage: 0.5,
    stakePool: 'Blush Pool 2',
    stakePoolName: 'BLS1',
  },
  {
    slotsElectedPercentage: 0.17,
    stakePool: 'Micro Mining',
    stakePoolName: 'MNG',
  },
  {
    slotsElectedPercentage: 0.08,
    stakePool: 'Saint-Petersburg Acade',
    stakePoolName: 'SPBA',
  },
];

storiesOf('Epochs', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Epoch List', () => (
    <EpochList title="Epochs" items={epochs} isLoading={false} />
  ))
  .add('Epoch Summary - 40% Complete', () => (
    <EpochSummary
      title="Epoch"
      epoch={{ ...epochs[0], ...{ percentage: 43 } }}
    />
  ))
  .add('Epoch Summary - 88% Complete', () => (
    <EpochSummary
      title="Epoch"
      epoch={{ ...epochs[0], ...{ percentage: 88 } }}
    />
  ))
  .add('Epoch Summary - Complete', () => (
    <EpochSummary
      title="Epoch"
      epoch={{ ...epochs[0], ...{ percentage: 100 } }}
    />
  ))
  .add('Stake Distribution', () => (
    <StakeDistribution title="Stake Distribution" items={stakeDistribution} />
  ));
