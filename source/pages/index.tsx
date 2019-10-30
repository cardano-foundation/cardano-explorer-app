import { noop } from 'lodash';
import Head from 'next/head';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import { LatestBlocks } from '../features/blocks/ui/LatestBlocks';
import EpochList from '../features/epochs/components/EpochList';
import { isMobileScreen } from '../helpers';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './index.scss';

const SideBackgroundImage = require('../public/assets/images/main-side-background.svg');

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
let Index = () => <NoSSR />;
if (environment.IS_CLIENT) {
  Index = () => (
    <NoSSR>
      <Head>
        <title>Byron | Index</title>
      </Head>
      <Layout hasContainer>
        {!isMobileScreen() && (
          <div className={styles.headerBackgroundAnimationContainer}>
            <div className={styles.headerBackgroundAnimation}>
              <iframe
                className={styles.animationIframe}
                src="//webdevm.iohk.io/?repo=cardano-sl&lang=en&content=Cryptographic%20currency%20implementing%20Ouroboros%20PoS%20protocol"
              />
            </div>
          </div>
        )}
        {!isMobileScreen() && (
          <div className={styles.sideBackgroundImageContainer}>
            <SideBackgroundImage className={styles.sideBackgroundImage} />
          </div>
        )}
        <Header
          withSearch
          brandType={BrandType.ENLARGED}
          searchProps={{ onSearch: noop }}
        />
        <div className={styles.epochList}>
          <EpochList title="Latest Epochs" items={epochs} />
        </div>
        <div className={styles.blockList}>
          <BlocksFeatureProvider>
            <LatestBlocks />
          </BlocksFeatureProvider>
        </div>
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default Index;
