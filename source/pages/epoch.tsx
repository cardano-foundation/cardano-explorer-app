import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import BlockList from '../features/blocks/components/BlockList';
import EpochSummary from '../features/epochs/components/EpochSummary';
import StakeDistribution from '../features/epochs/components/StakeDistribution';
import Container from '../widgets/container/Container';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './epoch.scss';

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
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 48,
    number: 21490,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 1,
  },
  {
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 48,
    number: 21490,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 2,
  },
  {
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 48,
    number: 21490,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 3,
  },
  {
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 48,
    number: 21490,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 4,
  },
  {
    createdAt: 1568366883000,
    createdBy: 'e1496c9',
    epoch: 48,
    number: 21490,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 5,
  },
];

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

let EpochPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  EpochPage = () => (
    <NoSSR>
      <Layout>
        <div className={styles.epochLayout}>
          <Header withSearch brandType={BrandType.SHRINKED} />
          <Container>
            <div className={styles.epochSummary}>
              <EpochSummary {...epochSummary} />
            </div>
            <div className={styles.blockList}>
              <BlockList title="Blocks" items={blocks} />
            </div>
            <div className={styles.stakeDistribution}>
              <StakeDistribution
                title="Stake Distribution"
                items={stakeDistribution}
              />
            </div>
          </Container>
          <Footer />
        </div>
      </Layout>
    </NoSSR>
  );
}

export default EpochPage;
