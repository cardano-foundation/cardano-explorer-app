import cx from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { BrandType, CardanoNetwork } from '../../constants';
import { environment } from '../../environment';
import { useI18nFeature } from '../../features/i18n/context';
import { useNavigationFeatureOptionally } from '../../features/navigation';
import { LocalizedLink } from '../../features/navigation/ui/LocalizedLink';
import { SearchBar } from '../../features/search/ui/SearchBar';
import CardanoLogo from '../../public/assets/images/header/cardano-logo.svg';
import styles from './Header.module.scss';

export interface IHeaderProps {
  brandType?: BrandType;
  router?: object;
}

export const Header = observer((props: IHeaderProps) => {
  const { translate } = useI18nFeature().store;
  const { brandType } = props;
  const navigation = useNavigationFeatureOptionally();
  const brandTypeStyle =
    brandType === BrandType.ENLARGED
      ? styles.enlargedHeaderContainer
      : styles.shrinkedHeaderContainer;
  const headerContainerStyles = cx([styles.headerContainer, brandTypeStyle]);
  const isStakePoolsPath = navigation?.store.path.includes('stake-pools');
  const testnetSubtitle =
    environment.CARDANO.NETWORK !== CardanoNetwork.MAINNET ? (
      <div className={styles.networkTitle}>
        {environment.CARDANO.NETWORK.replace(/-/g, ' ')}
      </div>
    ) : null;
  const stakePoolLink = (
    <LocalizedLink
      href="/stake-pools"
      className={isStakePoolsPath ? styles.activeTab : ''}
    >
      Stake Pools
    </LocalizedLink>
  );
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
            <LocalizedLink href="">
              <CardanoLogo className={styles.logo} />
            </LocalizedLink>
          </div>
          <div className={styles.titleContainer}>
            <LocalizedLink href="/">
              <span className={styles.cardanoTitle}>Cardano</span>
              <span className={styles.explorerTitle}>
                {translate('header.explorer')}
              </span>
            </LocalizedLink>
            {testnetSubtitle}
          </div>
          {stakePoolLink && (
            <div className={styles.tabs}>
              <div className={styles.tabLeftLine} />
              <div className={styles.tabCircle} />
              <LocalizedLink
                href="/"
                className={!isStakePoolsPath ? styles.activeTab : ''}
              >
                {translate('header.epochsBlocks')}
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
