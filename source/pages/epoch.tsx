import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../common/constants';
import { environment } from '../environment';
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
          </div>
          <FooterContainer />
        </div>
      </Layout>
    </NoSSR>
  );
}

export default EpochPage;
