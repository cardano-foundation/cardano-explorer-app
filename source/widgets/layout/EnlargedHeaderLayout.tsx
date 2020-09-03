import React from 'react';
import { BrandType, CardanoNetwork } from '../../constants';
import { environment } from '../../environment';
import { SearchBar } from '../../features/search/ui/SearchBar';
import SideBackgroundImage from '../../public/assets/images/main-side-background.svg';
import styles from './EnlargedHeaderLayout.module.scss';
import { Footer } from './Footer';
import { Header } from './Header';
import { Layout } from './Layout';

const mainNetHeaderImage = require('../../public/assets/images/header/mainnet.png');
const testNetHeaderImage = require('../../public/assets/images/header/testnet.png');

export const EnlargedHeaderLayout = (props: { children: React.ReactNode }) => (
  <>
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
