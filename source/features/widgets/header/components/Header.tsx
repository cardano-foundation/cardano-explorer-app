import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import React from 'react';
import Search, { ISearchProps } from '../../search/components/Search';
import styles from './Header.scss';

const backgroundImageUrl = require('../../../../static/assets/images/header/header-background.png');
const backgroundImage2Url = require('../../../../static/assets/images/header/header-background@2x.png');
const backgroundImage3Url = require('../../../../static/assets/images/header/header-background@3x.png');
const CardanoLogo = require('../../../../static/assets/images/header/cardano-logo.svg');

export enum BrandType {
  ENLARGED = 'enlarged',
  SHRINKED = 'shrinked',
}

export interface IHeaderProps {
  brandType?: BrandType;
  searchProps?: ISearchProps;
  router?: object;
  withBackground?: boolean;
  withSearch?: boolean;
}

const Header = (props: IHeaderProps) => {
  const { withBackground, brandType, withSearch, searchProps } = props;
  const brandTypeStyle =
    brandType === BrandType.ENLARGED
      ? styles.enlargedBrandType
      : styles.shrinkedBrandType;

  const indexClassName = !location.pathname.includes('stake-pools')
    ? styles.activeTab
    : '';
  const stakePoolsClassName = location.pathname.includes('stake-pools')
    ? styles.activeTab
    : '';

  return (
    <header className={styles.headerContainer}>
      {withBackground && (
        <div className={styles.backgroundImageContainer}>
          <img
            src={backgroundImageUrl}
            alt=""
            srcSet={`${backgroundImage2Url} 2x, ${backgroundImage3Url} 3x`}
            className={styles.backgroundImage}
          />
        </div>
      )}
      <div className={styles.contentContainer}>
        <div className={brandTypeStyle}>
          <div className={styles.logoContainer}>
            <CardanoLogo className={styles.logo} />
          </div>
          <div className={styles.titleContainer}>
            <span className={styles.cardanoTitle}>Cardano</span>
            <span className={styles.explorerTitle}>Blockchain Explorer</span>
          </div>
          <div className={styles.tabs}>
            <Link href="/">
              <a className={indexClassName}>Epochs & Blocks</a>
            </Link>
            <Link href="/stake-pools">
              <a className={stakePoolsClassName}>Stake Pools</a>
            </Link>
          </div>
          <div className={styles.triangleSign}>
            <div className={styles.straightLine} />
            <div className={styles.triangle}>
              <div className={styles.innerTriangle} />
            </div>
          </div>
        </div>
        {withSearch && (
          <div className={styles.searchContainer}>
            <Search {...searchProps} />
          </div>
        )}
      </div>
    </header>
  );
};

export default observer(Header);
