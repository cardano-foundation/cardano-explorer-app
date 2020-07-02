import { storiesOf } from '@storybook/react';
import React from 'react';
import { latestEpochsExample } from '../source/features/epochs/specs/helpers/latestEpochsExample';
import EpochList from '../source/features/epochs/ui/EpochList';
import EpochSummary from '../source/features/epochs/ui/EpochSummary';
import StakeDistribution from '../source/features/epochs/ui/StakeDistribution';
import { mainnetTheme } from '../source/styles/theme/theme';
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

storiesOf('Epochs|List', module)
  .add('Epoch List', () => (
    <EpochList
      currentEpoch={epochs[0].number}
      title="Epochs"
      items={epochs}
      isLoading={false}
    />
  ))
  .add('Stake Distribution', () => (
    <StakeDistribution title="Stake Distribution" items={stakeDistribution} />
  ));

storiesOf('Epochs|Summary', module)
  .addDecorator((story) => (
    <div style={mainnetTheme}>
      <PaddingDecorator>{story()}</PaddingDecorator>
    </div>
  ))
  .add('40% Complete', () => (
    <EpochSummary
      title="Epoch"
      epoch={{ ...epochs[0], ...{ percentage: 40 } }}
    />
  ))
  .add('88% Complete', () => (
    <EpochSummary
      title="Epoch"
      epoch={{ ...epochs[0], ...{ percentage: 88 } }}
    />
  ))
  .add('Complete', () => (
    <EpochSummary
      title="Epoch"
      epoch={{ ...epochs[0], ...{ percentage: 100 } }}
    />
  ));
