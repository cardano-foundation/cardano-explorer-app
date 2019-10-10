import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import BlockList from '../features/blocks/components/BlockList';
import { IBlockListRowProps } from '../features/blocks/components/BlockListRow';
import EpochList from '../features/epochs/components/EpochList';
import { IEpochListRowProps } from '../features/epochs/components/EpochListRow';
import styles from './index.scss';

export interface IMainPageProps {
  epochs: Array<IEpochListRowProps>;
  blocks: Array<IBlockListRowProps>;
}

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

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

const epochs = [
  {
    blocks: 20051,
    epoch: 138,
    output: 11189.647356,
    percentage: 40,
    slots: 21600,
    startedAt: 1568366883000,
    status: 'In progress...',
    transactions: 1,
  },
  {
    blocks: 21045,
    endedAt: 1569144483000,
    epoch: 137,
    output: 0.0,
    slots: 21600,
    startedAt: 1568366883000,
    status: '',
    transactions: 17,
  },
  {
    blocks: 21367,
    endedAt: 1569144483000,
    epoch: 136,
    output: 70090.386627,
    slots: 21600,
    startedAt: 1568366883000,
    status: '',
    transactions: 0,
  },
  {
    blocks: 21073,
    endedAt: 1569144483000,
    epoch: 135,
    output: 8397621.461829,
    slots: 21600,
    startedAt: 1568366883000,
    status: '',
    transactions: 12,
  },
  {
    blocks: 20034,
    endedAt: 1569144483000,
    epoch: 134,
    output: 18.872021,
    slots: 21600,
    startedAt: 1568366883000,
    status: '',
    transactions: 5,
  },
];

let IndexPage = (props: IMainPageProps) => <NoSSR />;

if (environment.IS_CLIENT) {
  const Layout = require('../layout/Layout').default;
  const SideBackgroundImage = require('../static/assets/images/main-side-background.svg');
  const HeaderContainer = require('../features/widgets/header/containers/HeaderContainer')
    .default;
  const FooterContainer = require('../features/widgets/footer/containers/FooterContainer')
    .default;

  IndexPage = (props: IMainPageProps) => (
    <NoSSR>
      <Layout hasContainer>
        <div className={styles.headerBackgroundAnimationContainer}>
          <div className={styles.headerBackgroundAnimation}>
            <iframe
              className={styles.animationIframe}
              src="//webdevm.iohk.io/?repo=cardano-sl&lang=en&content=Cryptographic%20currency%20implementing%20Ouroboros%20PoS%20protocol"
            />
          </div>
        </div>
        <div className={styles.sideBackgroundImageContainer}>
          <SideBackgroundImage className={styles.sideBackgroundImage} />
        </div>
        <HeaderContainer />
        <div className={styles.epochList}>
          <EpochList title="Latest Epochs" items={props.epochs || epochs} />
        </div>
        <div className={styles.blockList}>
          <BlockList title="Latest Blocks" items={props.blocks || blocks} />
        </div>
        <FooterContainer />
      </Layout>
    </NoSSR>
  );
}

export default IndexPage;
