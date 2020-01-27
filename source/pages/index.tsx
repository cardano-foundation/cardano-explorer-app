import React from 'react';
import { BrandType } from '../constants';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import { LatestBlocks } from '../features/blocks/ui/LatestBlocks';
import { EpochsFeatureProvider } from '../features/epochs/ui/EpochsFeatureProvider';
import { LatestEpochs } from '../features/epochs/ui/LatestEpochs';
import { SearchBar } from '../features/search/ui/SearchBar';
import SideBackgroundImage from '../public/assets/images/main-side-background.svg';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './index.module.scss';

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
      <Header brandType={BrandType.ENLARGED} />
      {page}
      <Footer rootClassname={styles.footer} />
    </Layout>
    <div className={styles.sideBgContainer}>
      <div className={styles.sideBackgroundImageContainer}>
        <SideBackgroundImage className={styles.sideBackgroundImage} />
      </div>
    </div>
  </>
);

Index.pageTitle = 'Cardano Explorer | Index';

export default Index;
