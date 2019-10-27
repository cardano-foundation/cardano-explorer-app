import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import React from 'react';
import { BrandType, CardanoEra, CardanoNetwork } from '../../constants';
import { environment } from '../../environment';
import Search, { ISearchProps } from '../../features/search/components/Search';
import styles from './Header.scss';

const CardanoLogo = require('../../public/assets/images/header/cardano-logo.svg');

export interface IHeaderProps {
  brandType?: BrandType;
  searchProps?: ISearchProps;
  router?: object;
  withSearch?: boolean;
}

export const Header = observer((props: IHeaderProps) => {
  const { brandType, withSearch, searchProps } = props;
  const brandTypeStyle =
    brandType === BrandType.ENLARGED
      ? styles.enlargedHeaderContainer
      : styles.shrinkedHeaderContainer;
  const headerContainerStyles = cx([styles.headerContainer, brandTypeStyle]);
  const indexClassName = !location.pathname.includes('stake-pools')
    ? styles.activeTab
    : '';
  const stakePoolsClassName = location.pathname.includes('stake-pools')
    ? styles.activeTab
    : '';
  const testnetSubtitle =
    environment.CARDANO.NETWORK !== CardanoNetwork.MAINNET ? (
      <div className={styles.networkTitle}>
        {environment.CARDANO.NETWORK.replace(/-/g, ' ')}
      </div>
    ) : null;
  const stakePoolLink =
    environment.CARDANO.ERA === CardanoEra.SHELLEY ? (
      <Link href="/stake-pools">
        <a className={stakePoolsClassName}>Stake Pools</a>
      </Link>
    ) : null;
  return (
    <header className={headerContainerStyles}>
      <div className={styles.contentContainer}>
        <div className={styles.brandType}>
          <div className={styles.logoContainer}>
            <CardanoLogo className={styles.logo} />
          </div>
          <div className={styles.titleContainer}>
            <span className={styles.cardanoTitle}>Cardano</span>
            <span className={styles.explorerTitle}>Blockchain Explorer</span>
            {testnetSubtitle}
          </div>
          <div className={styles.tabs}>
            <div className={styles.tabLeftLine} />
            <div className={styles.tabCircle} />
            <Link href="/">
              <a className={indexClassName}>Epochs & Blocks</a>
            </Link>
            <div className={styles.tabCircle} />
            {stakePoolLink}
            <div className={styles.tabCircle} />
            <div className={styles.tabRightLine} />
          </div>
          <div className={styles.triangleSign}>
            <div className={styles.straightLine} />
            <div className={styles.triangle}>
              <div className={styles.innerTriangle} />
            </div>
          </div>
        </div>
        {withSearch && searchProps && (
          <div className={styles.searchContainer}>
            <Search brandType={brandType} {...searchProps} />
          </div>
        )}
      </div>
    </header>
  );
});

Header.defaultProps = {
  brandType: BrandType.ENLARGED,
  withSearch: true,
};
