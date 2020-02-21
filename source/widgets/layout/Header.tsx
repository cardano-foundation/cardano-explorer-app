import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrandType, CardanoEra, CardanoNetwork } from '../../constants';
import { environment } from '../../environment';
import { LocalizedLink } from '../../features/navigation/ui/LocalizedLink';
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
      <LocalizedLink href="/stake-pools">
        <a className={stakePoolsClassName}>Stake Pools</a>
      </LocalizedLink>
    ) : null;
  const stakePoolTriangleStyle = stakePoolLink ? '' : styles.stakePoolTriangle;
  const triangleContainerStyles = cx([
    styles.triangleSign,
    stakePoolTriangleStyle,
  ]);
  return (
    <header className={headerContainerStyles}>
      <div className={styles.contentContainer}>
        <div className={styles.brandType}>
          <div className={styles.logoContainer}>
            <LocalizedLink href="/">
              <a>
                <CardanoLogo className={styles.logo} />
              </a>
            </LocalizedLink>
          </div>
          <div className={styles.titleContainer}>
            <LocalizedLink href="/">
              <a>
                <span className={styles.cardanoTitle}>Cardano</span>
                <span className={styles.explorerTitle}>
                  Blockchain Explorer
                </span>
              </a>
            </LocalizedLink>
            {testnetSubtitle}
          </div>
          {stakePoolLink && (
            <div className={styles.tabs}>
              <div className={styles.tabLeftLine} />
              <div className={styles.tabCircle} />
              <LocalizedLink href="/">
                <a className={indexClassName}>Epochs & Blocks</a>
              </LocalizedLink>
              <div className={styles.tabCircle} />
              {stakePoolLink}
              <div className={styles.tabCircle} />
              <div className={styles.tabRightLine} />
            </div>
          )}
          <div className={triangleContainerStyles}>
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
