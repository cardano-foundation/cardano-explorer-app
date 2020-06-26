import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import BlockCreation from '../source/features/blocks/ui/BlockCreation';
import BlockList from '../source/features/blocks/ui/BlockList';
import BlockSummary from '../source/features/blocks/ui/BlockSummary';
import Pagination from '../source/widgets/browsing/Pagination';
import ShowMoreButtonDecorator from '../source/widgets/decorators/ShowMoreButtonDecorator';
import { generateFakeBlockOverviews } from './support/fake-data-helpers';
import { PaddingDecorator } from './support/PaddingDecorator';
import { transactions } from './transactions.stories';

const blocks = generateFakeBlockOverviews(25);

const blockSummary = {
  confirmations: 0,
  createdAt: new Date(),
  createdBy: '[BLSH] pool',
  epoch: 47,
  id: '502017e88ff3b7389a0c7e6f4a6c808d171938467c9adbdc059250ab4a8fee72',
  merkleRoot:
    '0e5751c026e543b2e8ab2eb06099daa1d1e5df47778f7787faab45cdf12fe3a8',
  nextBlock: {
    id: '2111edea30970af11172bd8e2f05c7406cba8f20d9bb78c4fa62ba06881372e7',
    number: 2,
  },
  number: 11044,
  output: '13130',
  prevBlock: {
    id: '8b09535f8b6109cbdd6ab4d036ec0a43426be2e4d799c46652f291fa6fa9987f',
    number: 11043,
  },
  size: 634,
  slotWithinEpoch: 11043,
  time: 1470006392000,
  title: 'Block Summary',
  transactions,
  transactionsCount: '0',
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

storiesOf('Blocks|List', module)
  .add('plain', () => (
    <BlockList title="Blocks" items={blocks.slice(0, 5)} isLoading={false} />
  ))
  .add('with show more button', () => (
    <ShowMoreButtonDecorator label={'show more'} href={''}>
      <BlockList title="Blocks" items={blocks.slice(0, 5)} isLoading={false} />
    </ShowMoreButtonDecorator>
  ))
  .add('with pagination', () => (
    <>
      <BlockList title="Blocks" items={blocks.slice(0, 5)} isLoading={false} />
      <Pagination
        currentPage={1}
        onChangePage={action('change page')}
        totalPages={25}
      />
    </>
  ));

storiesOf('Blocks|Summary', module)
  .addDecorator((story) => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Summary', () => (
    <BlockSummary networkBlockHeight={11044 + 100} {...blockSummary} />
  ));

storiesOf('Blocks|Creation', module)
  .addDecorator((story) => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Creation', () => (
    <BlockCreation title="Block Creation" items={blockCreation} />
  ));
