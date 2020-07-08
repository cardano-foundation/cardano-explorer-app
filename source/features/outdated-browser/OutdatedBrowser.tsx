import React, { Component, useEffect } from 'react';
import { useI18nFeature } from '../i18n/context';
import styles from './OutdatedBrowser.module.scss';

const CardanoLogo = require('../../public/assets/images/header/cardano-logo.svg');
const ContainerBackground = require('../../public/assets/images/outdated-browser/hub-tripple-background.svg');
const FirefoxGrayLogo = require('../../public/assets/images/outdated-browser/firefox-gray.svg');
const OperaGrayLogo = require('../../public/assets/images/outdated-browser/opera-gray.svg');
const ChromeGrayLogo = require('../../public/assets/images/outdated-browser/chrome-gray.svg');
const EdgeGrayLogo = require('../../public/assets/images/outdated-browser/edge-gray.svg');
const SafariGrayLogo = require('../../public/assets/images/outdated-browser/safari-gray.svg');
const FirefoxLogo = require('../../public/assets/images/outdated-browser/firefox.svg');
const OperaLogo = require('../../public/assets/images/outdated-browser/opera.svg');
const ChromeLogo = require('../../public/assets/images/outdated-browser/chrome.svg');
const EdgeLogo = require('../../public/assets/images/outdated-browser/edge.svg');
const SafariLogo = require('../../public/assets/images/outdated-browser/safari.svg');

export interface IOutdatedBrowserProps {
  text: string;
  updateBrowserUrl: string;
}

function detectUserBrowser() {
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
    ((p) => {
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
}

export const OutdatedBrowser = (props: IOutdatedBrowserProps) => {
  const { translate } = useI18nFeature().store;
  const { text, updateBrowserUrl } = props;
  const userBrowser = detectUserBrowser();

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
            <FirefoxGrayLogo className={styles.browserIcon} />
            <FirefoxLogo className={styles.browserIconHover} />
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
            <OperaGrayLogo className={styles.browserIcon} />
            <OperaLogo className={styles.browserIconHover} />
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
            <ChromeGrayLogo className={styles.browserIcon} />
            <ChromeLogo className={styles.browserIconHover} />
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
            <EdgeGrayLogo className={styles.browserIcon} />
            <EdgeLogo className={styles.browserIconHover} />
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
            <SafariGrayLogo className={styles.browserIcon} />
            <SafariLogo className={styles.browserIconHover} />
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
          {translate('outdatedBrowser.updateBrowserFirst')}{' '}
          {userBrowser && <span>({userBrowser})</span>}{' '}
          {translate('outdatedBrowser.updateBrowserSecond')}
        </p>
      </div>
    </div>
  );
};

export default OutdatedBrowser;
