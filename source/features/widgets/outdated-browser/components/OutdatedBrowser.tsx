import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './OutdatedBrowser.scss';

const CardanoLogo = require('../../../../static/assets/images/header/cardano-logo.svg');

export interface IOutdatedBrowserProps {
  text: string;
}

const OutdatedBrowser = (props: IOutdatedBrowserProps) => {
  const { text } = props;

  const userBrowser = window.navigator.appName;

  return (
    <div className={styles.outdatedBrowserContainer}>
      <div className={styles.topHeaderContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.brandType}>
            <div className={styles.logoContainer}>
              <CardanoLogo className={styles.logo} />
            </div>
            <div className={styles.titleContainer}>
              <span className={styles.outdatedTitle}>{text}</span>
            </div>
            <div className={styles.triangleSign}>
              <div className={styles.straightLine} />
              <div className={styles.triangle}>
                <div className={styles.innerTriangle} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomContainer}>
        <p className={styles.bottomContainerText}>
          Update your ({userBrowser}) browser for more security, speed and the
          best experience on this site.
        </p>
      </div>
    </div>
  );
};

export default observer(OutdatedBrowser);
