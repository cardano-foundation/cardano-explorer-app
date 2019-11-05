import Head from 'next/head';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import { LatestBlocks } from '../features/blocks/ui/LatestBlocks';
import { EpochsFeatureProvider } from '../features/epochs/ui/EpochsFeatureProvider';
import { LatestEpochs } from '../features/epochs/ui/LatestEpochs';
import { SearchBar } from '../features/search/ui/SearchBar';
import { isMobileScreen } from '../helpers';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './index.scss';

const SideBackgroundImage = require('../public/assets/images/main-side-background.svg');

// Empty on server
let Index = () => <NoSSR />;

// Full components on client
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
              <img src="/assets/images/main-header-background.png" />
            </div>
          </div>
        )}
        {!isMobileScreen() && (
          <div className={styles.sideBackgroundImageContainer}>
            <SideBackgroundImage className={styles.sideBackgroundImage} />
          </div>
        )}
        <Header brandType={BrandType.ENLARGED} />
        <div>
          <SearchBar brandType={BrandType.ENLARGED} />
        </div>
        <div className={styles.epochList}>
          <EpochsFeatureProvider>
            <LatestEpochs />
          </EpochsFeatureProvider>
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
