import React from 'react';
import { BrandType, CardanoNetwork } from '../constants';
import { environment } from '../environment';
import { BlocksFeatureProvider } from '../features/blocks/ui/BlocksFeatureProvider';
import { LatestBlocks } from '../features/blocks/ui/LatestBlocks';
import { EpochsFeatureProvider } from '../features/epochs/ui/EpochsFeatureProvider';
import { LatestEpochs } from '../features/epochs/ui/LatestEpochs';
import { SearchBar } from '../features/search/ui/SearchBar';
import SideBackgroundImage from '../public/assets/images/main-side-background.svg';
import { Footer, Header, Layout } from '../widgets/layout';
const mainNetHeaderImage = require('../public/assets/images/header/mainnet.png');
const testNetHeaderImage = require('../public/assets/images/header/testnet.png');
import LanguageSwitcher from '../widgets/language-switcher/LanguageSwitcher';
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

const currentLanguage = {
  code: 'EN',
  title: 'English',
};

const languages = [
  { code: 'EN', title: 'English' },
  { code: 'JP', title: 'Japanese' },
];

Index.getStaticLayout = (page: React.ReactNode) => (
  <>
    {environment.CARDANO.NETWORK === CardanoNetwork.MAINNET && (
      <img src={mainNetHeaderImage} className={styles.mainNetHeaderImage} />
    )}
    {environment.CARDANO.NETWORK === CardanoNetwork.TESTNET && (
      <img src={testNetHeaderImage} className={styles.testNetHeaderImage} />
    )}
    <Layout>
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        languages={languages}
      />
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
