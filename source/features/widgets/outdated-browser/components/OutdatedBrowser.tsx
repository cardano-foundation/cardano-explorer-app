import React, { Component } from 'react';
import styles from './OutdatedBrowser.scss';

const CardanoLogo = require('../../../../static/assets/images/header/cardano-logo.svg');

export interface IOutdatedBrowserProps {
  text: string;
}

export default class OutdatedBrowser extends Component<IOutdatedBrowserProps> {
  public detectUserBrowser = () => {
    const isOpera =
      // @ts-ignore
      (!!window.opr && !!opr.addons) ||
      // @ts-ignore
      !!window.opera ||
      navigator.userAgent.indexOf(' OPR/') >= 0;

    // @ts-ignore
    const isFirefox = typeof InstallTrigger !== 'undefined';

    const isSafari =
      // @ts-ignore
      /constructor/i.test(window.HTMLElement) ||
      (p => {
        return p.toString() === '[object SafariRemoteNotification]';
        // @ts-ignore
      })(
        // @ts-ignore
        !window.safari ||
          // @ts-ignore
          (typeof safari !== 'undefined' && safari.pushNotification)
      );

    // @ts-ignore
    const isIE = /*@cc_on!@*/ false || !!document.documentMode;

    // @ts-ignore
    const isEdge = !isIE && !!window.StyleMedia;

    const isChrome =
      // @ts-ignore
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // @ts-ignore
    const isBlink = (isChrome || isOpera) && !!window.CSS;

    let browserType = '';

    if (isOpera) {
      browserType = 'Opera';
    } else if (isFirefox) {
      browserType = 'Firefox';
    } else if (isSafari) {
      browserType = 'Safari';
    } else if (isIE) {
      browserType = 'Internet Explorer';
    } else if (isEdge) {
      browserType = 'EDGE';
    } else if (isChrome) {
      browserType = 'Chrome';
    } else if (isBlink) {
      browserType = 'Blink';
    }
    return browserType;
  };

  public render() {
    const { text } = this.props;

    const userBrowser = this.detectUserBrowser();

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
            Update your {userBrowser && <span>({userBrowser})</span>} browser
            for more security, speed and the best experience on this site.
          </p>
        </div>
      </div>
    );
  }
}
