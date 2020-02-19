import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import React from 'react';
import { BrandType, CardanoEra, CardanoNetwork } from '../../constants';
import { environment } from '../../environment';
import { useNavigationFeatureOptionally } from '../../features/navigation';
import { SearchBar } from '../../features/search/ui/SearchBar';
import CardanoLogo from '../../public/assets/images/header/cardano-logo.svg';
import styles from './Header.module.scss';

export interface IHeaderProps {
  brandType?: BrandType;
  router?: object;
}

export const Header = observer((props: IHeaderProps) => {
  const { brandType } = props;
  const navigation = useNavigationFeatureOptionally();
  const brandTypeStyle =
    brandType === BrandType.ENLARGED
      ? styles.enlargedHeaderContainer
      : styles.shrinkedHeaderContainer;
  const headerContainerStyles = cx([styles.headerContainer, brandTypeStyle]);
  const indexClassName = !navigation?.store.path.includes('stake-pools')
    ? styles.activeTab
    : '';
  const stakePoolsClassName = navigation?.store.path.includes('stake-pools')
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
            <Link href="/">
              <a>
                <CardanoLogo className={styles.logo} />
              </a>
            </Link>
          </div>
          <div className={styles.titleContainer}>
            <Link href="/">
              <a>
                <span className={styles.cardanoTitle}>Cardano</span>
                <span className={styles.explorerTitle}>
                  Blockchain Explorer
                </span>
              </a>
            </Link>
            {testnetSubtitle}
          </div>
          <div className={styles.triangleSign}>
            <div className={styles.straightLine} />
            <div className={styles.triangle}>
              <div className={styles.innerTriangle} />
            </div>
          </div>
        </div>
        {brandType === BrandType.SHRINKED && (
          <div className={styles.searchContainer}>
            <SearchBar brandType={BrandType.SHRINKED} />
          </div>
        )}
      </div>
    </header>
  );
});

Header.defaultProps = {
  brandType: BrandType.ENLARGED,
};
