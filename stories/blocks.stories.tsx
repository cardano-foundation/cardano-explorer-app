import { storiesOf } from '@storybook/react';
import React from 'react';
import BlockCreation from '../source/features/blocks/components/BlockCreation';
import BlockList from '../source/features/blocks/components/BlockList';
import BlockSummary from '../source/features/blocks/components/BlockSummary';
import { PaddingDecorator } from './support/PaddingDecorator';

const blocks = [
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 138,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 1,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 139,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 2,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 137,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 3,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 139,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 4,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: 'e1496c9',
    epoch: 140,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 5,
  },
];

const blockSummary = {
  block: 11044,
  confirmations: 0,
  createdBy: '[BLSH] pool',
  epoch: 47,
  id: '502017e88ff3b7389a0c7e6f4a6c808d171938467c9adbdc059250ab4a8fee72',
  merkleRoot:
    '0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8',
  nextBlock: '2111edea30970af11172bd8e2f05c7406cba8f20d9bb78c4fa62ba06881372e7',
  prevBlock: '1b6532a66b067f7b81691924f00c4abc1cfbe8496dcb150dba1704ac080c2dc0',
  size: 634,
  time: 1470006392000,
  title: 'Block Summary',
  transactions: 0,
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
  .add('Block List', () => <BlockList title="Blocks" items={blocks} />)
  .add('Block Summary', () => <BlockSummary {...blockSummary} />)
  .add('Block Creation', () => (
    <BlockCreation title="Block Creation" items={blockCreation} />
  ));
