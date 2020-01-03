import Head from 'next/head';
import React from 'react';
import { BrandType } from '../constants';
import { environment } from '../environment';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import { LatestBlocks } from '../features/blocks/ui/LatestBlocks';
import { EpochsFeatureProvider } from '../features/epochs/ui/EpochsFeatureProvider';
import { LatestEpochs } from '../features/epochs/ui/LatestEpochs';
import { SearchBar } from '../features/search/ui/SearchBar';
import { isMobileScreen } from '../helpers';
import SideBackgroundImage from '../public/assets/images/main-side-background.svg';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './index.scss';

const Index = () => (
  <>
    <SearchBar brandType={BrandType.ENLARGED} />
    <BlocksFeatureProvider>
      <div className={styles.epochList}>
        <EpochsFeatureProvider>
          <LatestEpochs />
        </EpochsFeatureProvider>
      </div>
      <div className={styles.blockList}>
        <LatestBlocks />
      </div>
    </BlocksFeatureProvider>
  </>
);

Index.getStaticLayout = (page: React.ReactNode) => (
  <>
    {/*{!isMobileScreen() && (*/}
    {/*  <div className={styles.headerBgContainer}>*/}
    {/*    <div className={styles.headerBg}>*/}
    {/*      <img src="/assets/images/main-header-background.png" />*/}
    {/*    </div>*/}
    {/*  </div>*/}
    {/*)}*/}
    <Layout>
      <Head>
        <title>Byron | Index</title>
      </Head>
      <Header brandType={BrandType.ENLARGED} />
      {page}
      <Footer />
    </Layout>
    {environment.IS_CLIENT && !isMobileScreen() && (
      <div className={styles.sideBgContainer}>
        <div className={styles.sideBackgroundImageContainer}>
          <SideBackgroundImage className={styles.sideBackgroundImage} />
        </div>
      </div>
    )}
  </>
);

export default Index;
