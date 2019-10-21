import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../common/constants';
import { environment } from '../environment';
import BlockCreation from '../features/blocks/components/BlockCreation';
import BlockList from '../features/blocks/components/BlockList';
import EpochSummary from '../features/epochs/components/EpochSummary';
import FooterContainer from '../features/widgets/footer/containers/FooterContainer';
import Header from '../features/widgets/header/components/Header';
import Layout from '../layout/Layout';
import styles from './epoch.scss';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

const epochSummary = {
  blocks: 21490,
  endedAt: 1579366885000,
  epoch: 48,
  output: 0.0,
  percentage: 40,
  slots: 21600,
  startedAt: 1568366883000,
  status: 'In progress...',
  title: 'Epoch',
  transactions: 0,
};

const blocks = [
  {
    block: 21490,
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 48,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 1,
  },
  {
    block: 21490,
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 48,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 2,
  },
  {
    block: 21490,
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 48,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 3,
  },
  {
    block: 21490,
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 48,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 4,
  },
  {
    block: 21490,
    createdAt: 1568366883000,
    createdBy: 'e1496c9',
    epoch: 48,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 5,
  },
];

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

let EpochPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  EpochPage = () => (
    <NoSSR>
      <Layout>
        <div className={styles.epochLayout}>
          <Header withSearch brandType={BrandType.SHRINKED} />
          <div className={styles.container}>
            <div className={styles.epochSummary}>
              <EpochSummary {...epochSummary} />
            </div>
            <div className={styles.blockList}>
              <BlockList title="Blocks" items={blocks} />
            </div>
            <div className={styles.blockCreation}>
              <BlockCreation title="Block Creation" items={blockCreation} />
            </div>
          </div>
          <FooterContainer />
        </div>
      </Layout>
    </NoSSR>
  );
}

export default EpochPage;
