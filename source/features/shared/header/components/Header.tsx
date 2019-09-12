import { observer } from 'mobx-react-lite';
import React from 'react';
import SearchForm, { ISearchFormProps } from '../../search/components';

import styles from './Header.scss';

// @ts-ignore
import backgroundImageUrl from '../../../../static/assets/images/header/bg-dummy-irl-should-be-animated.png';
// @ts-ignore
import backgroundImage2Url from '../../../../static/assets/images/header/bg-dummy-irl-should-be-animated@2x.png';
// @ts-ignore
import backgroundImage3Url from '../../../../static/assets/images/header/bg-dummy-irl-should-be-animated@3x.png';
// @ts-ignore
import CardanoLogo from '../../../../static/assets/images/header/cardano-logo.svg';

export enum BrandType {
  ENLARGED = 'enlarged',
  SHRINKED = 'shrinked',
}

export interface IHeaderProps {
  withBackground?: boolean;
  brandType?: BrandType;
  withSearchForm?: boolean;
  searchFormProps?: ISearchFormProps;
}

const Header = (props: IHeaderProps) => {
  const { withBackground, brandType, withSearchForm, searchFormProps } = props;
  const brandTypeStyle =
    brandType === BrandType.ENLARGED
      ? styles.enlargedBrandType
      : styles.shrinkedBrandType;

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
          <div className={styles.triangleSign}>
            <div className={styles.straightLine} />
            <div className={styles.triangle}>
              <div className={styles.innerTriangle} />
            </div>
          </div>
        </div>
        {withSearchForm && (
          <div className={styles.searchFormContainer}>
            <SearchForm {...searchFormProps} />
          </div>
        )}
      </div>
    </header>
  );
};

export default observer(Header);
