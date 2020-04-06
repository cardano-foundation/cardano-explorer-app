import Head from 'next/head';
import React from 'react';
import { BrandType, CardanoNetwork } from '../../constants';
import { environment } from '../../environment';
import { StaticLayoutProps } from '../../lib/types';
import SideBackgroundImage from '../../public/assets/images/main-side-background.svg';
import { Footer, Header, Layout } from '../../widgets/layout';
import { BlocksFeatureProvider } from '../blocks/ui/BlocksFeatureProvider';
import { LatestBlocks } from '../blocks/ui/LatestBlocks';
import { EpochsFeatureProvider } from '../epochs/ui/EpochsFeatureProvider';
import { LatestEpochs } from '../epochs/ui/LatestEpochs';
import { useI18nFeature } from '../i18n/context';
import { i18nInitialProps } from '../i18n/utils';
import { SearchBar } from '../search/ui/SearchBar';
const mainNetHeaderImage = require('../../public/assets/images/header/mainnet.png');
const testNetHeaderImage = require('../../public/assets/images/header/testnet.png');
import styles from './LandingPage.module.scss';

export const LandingPage = () => (
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
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <>
      <Head>
        <title>{translate('index.pageTitle')}</title>
      </Head>
      {environment.CARDANO.NETWORK === CardanoNetwork.MAINNET && (
        <img src={mainNetHeaderImage} className={styles.mainNetHeaderImage} />
      )}
      {environment.CARDANO.NETWORK === CardanoNetwork.TESTNET && (
        <img src={testNetHeaderImage} className={styles.testNetHeaderImage} />
      )}
      <Layout>
        <Header brandType={BrandType.ENLARGED} />
        <SearchBar brandType={BrandType.ENLARGED} />
        {props.children}
        <Footer rootClassname={styles.footer} />
      </Layout>
      <div className={styles.sideBgContainer}>
        <div className={styles.sideBackgroundImageContainer}>
          <SideBackgroundImage className={styles.sideBackgroundImage} />
        </div>
      </div>
    </>
  );
};

LandingPage.getInitialProps = i18nInitialProps;
LandingPage.getStaticLayout = () => StaticLayout;
