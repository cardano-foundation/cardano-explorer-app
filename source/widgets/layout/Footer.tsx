import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './Footer.scss';

const iohkLogo = require('../../static/assets/images/iohk-logo.png');
const twitterIcon = require('../../static/assets/images/twitter-icon.png');
const facebookIcon = require('../../static/assets/images/facebook-icon.png');
const youtubeIcon = require('../../static/assets/images/youtube-icon.png');
const newsletterIcon = require('../../static/assets/images/newsletter-icon.png');

export const Footer = observer(() => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>
        <div className={styles.footerTopContainer}>
          <p className={styles.copyright}>Cardano {new Date().getFullYear()}</p>
          <div className={styles.logos}>
            <div className={styles.logoText}>
              <a href="#">
                <img src={iohkLogo} className={styles.iohkLogo} />
              </a>
              <p className={styles.iohkText}>IOHK Supported Project</p>
            </div>
            <div className={styles.socialIcons}>
              <a href="#">
                <img src={twitterIcon} className={styles.twitterIcon} />
              </a>
              <a href="#">
                <img src={facebookIcon} className={styles.facebookIcon} />
              </a>
              <a href="#">
                <img src={youtubeIcon} className={styles.youtubeIcon} />
              </a>
              <a href="#">
                <img src={newsletterIcon} className={styles.newsletterIcon} />
              </a>
            </div>
          </div>
        </div>
        <div className={styles.footerMiddleContainer}>
          <hr className={styles.footerSeparator} />
        </div>
        <div className={styles.footerBottomContainer}>
          <div className={styles.cardanoTextContainer}>
            <h5 className={styles.cardanoTextTitle}>
              Cardano is an{' '}
              <a href="">
                <span>Open Source</span>
              </a>{' '}
              project.
            </h5>
            <div className={styles.cardanoText}>
              Cardano is a software platform ONLY and does not conduct any
              independent diligence on or substantive review of any blockchain
              asset, digital currency, cryptocurrency or associated funds. You
              are fully and solely responsible for evaluating your investments,
              for determining whether you will exchange blockchain assets based
              on your own, and for all your decisions as to whether to exchange
              blockchain assets with Cardano. In many cases, blockchain assets
              you exchange on the basis of your research may not increase in
              value, and may decrease in value. Similarly, blockchain assets you
              exchange on the basis of your research may increase in value after
              your exchange.
              <p>
                Past performance is not indicative of future results. Any
                investment in blockchain assets involves the risk of loss of
                part or all of your investment. The value of the blockchain
                assets you exchange is subject to market and other investment
                risks.
              </p>
            </div>
          </div>
          <div className={styles.footerMenusContainer}>
            <div className={styles.aboutCardanoMenuContainer}>
              <h5 className={styles.aboutCardanoTitle}>More about Cardano</h5>
              <ul className={styles.aboutCardanoMenu}>
                <li>
                  <a href={'#'}>Blockchain Explorer</a>
                </li>
                <li>
                  <a href={'#'}>Cardano Foundation</a>
                </li>
                <li>
                  <a href={'#'}>Documentation</a>
                </li>
                <li>
                  <a href={'#'}>Cardano SL Source</a>
                </li>
                <li>
                  <a href={'#'}>Why Cardano</a>
                </li>
                <li>
                  <a href={'#'}>Daedalus Platform</a>
                </li>
                <li>
                  <a href={''}>Ouroboros algorithm</a>
                </li>
              </ul>
            </div>
            <div className={styles.joinTheCommunityMenuContainer}>
              <h5 className={styles.joinTheCommunityTitle}>
                Join the community
              </h5>
              <ul className={styles.joinTheCommunityMenu}>
                <li>
                  <a href={'#'}>Cardano Community</a>
                </li>
                <li>
                  <a href={'#'}>Cardano Chat</a>
                </li>
                <li>
                  <a href={'#'}>Cardano Forum</a>
                </li>
                <li>
                  <a href={'#'}>Cardano Reddit</a>
                </li>
                <li>
                  <a href={'#'}>Cardano Foundation Youtube</a>
                </li>
                <li>
                  <a href={'#'}>Cardano Foundation Twitter</a>
                </li>
                <li>
                  <a
                    href="mailto:info@cardano.org"
                    className={styles.emailLink}
                  >
                    info@cardano.org
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
});
