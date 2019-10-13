import React, { Component } from 'react';
import styles from './OutdatedBrowser.scss';

const CardanoLogo = require('../../../../static/assets/images/header/cardano-logo.svg');
const ContainerBackground = require('../../../../static/assets/images/outdated-browser/hub-tripple-background.svg');
const FirefoxLogo = require('../../../../static/assets/images/outdated-browser/firefox-icon.svg');
const OperaLogo = require('../../../../static/assets/images/outdated-browser/opera-icon.svg');
const ChromeLogo = require('../../../../static/assets/images/outdated-browser/chrome-icon.svg');
const EdgeLogo = require('../../../../static/assets/images/outdated-browser/edge-icon.svg');
const SafariLogo = require('../../../../static/assets/images/outdated-browser/safari-icon.svg');

export interface IOutdatedBrowserProps {
  text: string;
  updateBrowserUrl: string;
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
    const { text, updateBrowserUrl } = this.props;

    const userBrowser = this.detectUserBrowser();

    return (
      <div className={styles.outdatedBrowserContainer}>
        <ContainerBackground
          className={styles.outdatedBrowserContainerBackground}
        />
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
        <div className={styles.mainContainer}>
          <div className={styles.browserColumn}>
            <a className={styles.browserLink} href={updateBrowserUrl}>
              <FirefoxLogo className={styles.browserIcon} />
            </a>
            <div className={styles.browserName}>
              <a className={styles.browserLink} href={updateBrowserUrl}>
                Firefox
              </a>
            </div>
            <div className={styles.browserCompany}>Mozila Foundation</div>
          </div>
          <div className={styles.browserColumn}>
            <a className={styles.browserLink} href={updateBrowserUrl}>
              <OperaLogo className={styles.browserIcon} />
            </a>
            <div className={styles.browserName}>
              <a className={styles.browserLink} href={updateBrowserUrl}>
                Opera
              </a>
            </div>
            <div className={styles.browserCompany}>Opera Software</div>
          </div>
          <div className={styles.browserColumn}>
            <a className={styles.browserLink} href={updateBrowserUrl}>
              <ChromeLogo className={styles.browserIcon} />
            </a>
            <div className={styles.browserName}>
              <a className={styles.browserLink} href={updateBrowserUrl}>
                Chrome
              </a>
            </div>
            <div className={styles.browserCompany}>Google</div>
          </div>
          <div className={styles.browserColumn}>
            <a className={styles.browserLink} href={updateBrowserUrl}>
              <EdgeLogo className={styles.browserIcon} />
            </a>
            <div className={styles.browserName}>
              <a className={styles.browserLink} href={updateBrowserUrl}>
                Edge
              </a>
            </div>
            <div className={styles.browserCompany}>Microsoft</div>
          </div>
          <div className={styles.browserColumn}>
            <a className={styles.browserLink} href={updateBrowserUrl}>
              <SafariLogo className={styles.browserIcon} />
            </a>
            <div className={styles.browserName}>
              <a className={styles.browserLink} href={updateBrowserUrl}>
                Safari
              </a>
            </div>
            <div className={styles.browserCompany}>Apple</div>
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
