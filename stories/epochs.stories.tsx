import { storiesOf } from '@storybook/react';
import React from 'react';
import { latestEpochsExample } from '../source/features/epochs/specs/helpers/latestEpochsExample';
import EpochList from '../source/features/epochs/ui/EpochList';
import EpochSummary from '../source/features/epochs/ui/EpochSummary';
import StakeDistribution from '../source/features/epochs/ui/StakeDistribution';
import { PaddingDecorator } from './support/PaddingDecorator';

const epochs = latestEpochsExample;

Object.assign(epochs[0], {
  percentage: 40,
  status: 'In progress...',
});

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
  .add('Epoch Summary', () => <EpochSummary title="Epoch" epoch={epochs[0]} />)
  .add('Stake Distribution', () => (
    <StakeDistribution title="Stake Distribution" items={stakeDistribution} />
  ));
