import Head from 'next/head';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import { LatestBlocks } from '../features/blocks/ui/LatestBlocks';
import { EpochsFeatureProvider } from '../features/epochs/ui/EpochsFeatureProvider';
import { LatestEpochs } from '../features/epochs/ui/LatestEpochs';
import { SearchFeatureProvider } from '../features/search/components/SearchFeatureProvider';
import { SearchBar } from '../features/search/containers/SearchBar';
import { isMobileScreen } from '../helpers';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './index.scss';

const SideBackgroundImage = require('../public/assets/images/main-side-background.svg');

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
        <Header brandType={BrandType.ENLARGED} />
        <div className={styles.searchContainer}>
          <SearchFeatureProvider>
            <SearchBar brandType={BrandType.ENLARGED} />
          </SearchFeatureProvider>
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
