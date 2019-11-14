import { storiesOf } from '@storybook/react';
import React from 'react';
import BlockCreation from '../source/features/blocks/ui/BlockCreation';
import BlockList from '../source/features/blocks/ui/BlockList';
import BlockSummary from '../source/features/blocks/ui/BlockSummary';
import { PaddingDecorator } from './support/PaddingDecorator';
import { transactions } from './transactions.stories';

const blocks = [
  {
    createdAt: new Date(1568366883000),
    createdBy: 'af2800c',
    epoch: 138,
    id: '687bc1d9ff5b7c8167b25cca5659e80a40583512ba925271bf3005600eb0a0ec',
    number: 20051,
    output: 11189.647356,
    size: 1024,
    slotWithinEpoch: 21600,
    transactionsCount: 1,
  },
  {
    createdAt: new Date(1568366883000),
    createdBy: '6c9e149',
    epoch: 139,
    id: '687bc1d9ff5b7c8167b25cca5659e80a40583512ba925271bf3005600eb0a0ec',
    number: 20051,
    output: 11189.647356,
    size: 1024,
    slotWithinEpoch: 21600,
    transactionsCount: 2,
  },
  {
    createdAt: new Date(1568366883000),
    createdBy: 'af2800c',
    epoch: 137,
    id: '687bc1d9ff5b7c8167b25cca5659e80a40583512ba925271bf3005600eb0a0ec',
    number: 20051,
    output: 11189.647356,
    size: 1024,
    slotWithinEpoch: 21600,
    transactionsCount: 3,
  },
  {
    createdAt: new Date(1568366883000),
    createdBy: '6c9e149',
    epoch: 139,
    id: '687bc1d9ff5b7c8167b25cca5659e80a40583512ba925271bf3005600eb0a0ec',
    number: 20051,
    output: 11189.647356,
    size: 1024,
    slotWithinEpoch: 21600,
    transactionsCount: 4,
  },
  {
    createdAt: new Date(1568366883000),
    createdBy: 'e1496c9',
    epoch: 140,
    id: '687bc1d9ff5b7c8167b25cca5659e80a40583512ba925271bf3005600eb0a0ec',
    number: 20051,
    output: 11189.647356,
    size: 1024,
    slotWithinEpoch: 21600,
    transactionsCount: 5,
  },
];

const blockSummary = {
  confirmations: 0,
  createdAt: new Date(),
  createdBy: '[BLSH] pool',
  epoch: 47,
  id: '502017e88ff3b7389a0c7e6f4a6c808d171938467c9adbdc059250ab4a8fee72',
  merkleRoot:
    '0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8',
  nextBlock: '2111edea30970af11172bd8e2f05c7406cba8f20d9bb78c4fa62ba06881372e7',
  number: 11044,
  output: 13130,
  prevBlock: {
    id: '8b09535f8b6109cbdd6ab4d036ec0a43426be2e4d799c46652f291fa6fa9987f',
    number: 11043,
  },
  size: 634,
  slotWithinEpoch: 11043,
  time: 1470006392000,
  title: 'Block Summary',
  transactions,
  transactionsCount: 0,
};

const blockCreation = [
  {
    performance: 216,
    performancePercentage: 100,
    sharedRewards: 194,
    slotsElected: 216,
    slotsElectedPercentage: 1,
    stakePool: 'Help the USA Cats',
    stakePoolName: 'CATS',
  },
  {
    performance: 193,
    performancePercentage: 100,
    sharedRewards: 193,
    slotsElected: 193,
    slotsElectedPercentage: 0.9,
    stakePool: 'Cardano Foundation 1',
    stakePoolName: 'CF1',
  },
  {
    performance: 158,
    performancePercentage: 98,
    sharedRewards: 79,
    slotsElected: 160,
    slotsElectedPercentage: 0.78,
    stakePool: 'Blush Pool 1',
    stakePoolName: 'BLS1',
  },
  {
    performance: 101,
    performancePercentage: 100,
    sharedRewards: 65,
    slotsElected: 101,
    slotsElectedPercentage: 0.5,
    stakePool: 'Blush Pool 2',
    stakePoolName: 'BLS1',
  },
  {
    performance: 2,
    performancePercentage: 8,
    sharedRewards: 0,
    slotsElected: 25,
    slotsElectedPercentage: 0.17,
    stakePool: 'Micro Mining',
    stakePoolName: 'MNG',
  },
  {
    performance: 8,
    performancePercentage: 72,
    sharedRewards: 1,
    slotsElected: 11,
    slotsElectedPercentage: 0.08,
    stakePool: 'Saint-Petersburg Acade',
    stakePoolName: 'SPBA',
  },
];

storiesOf('Blocks', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Block List', () => (
    <BlockList title="Blocks" items={blocks} isLoading={false} />
  ))
  .add('Block Summary', () => (
    <BlockSummary networkBlockHeight={11044 + 100} {...blockSummary} />
  ))
  .add('Block Creation', () => (
    <BlockCreation title="Block Creation" items={blockCreation} />
  ));
