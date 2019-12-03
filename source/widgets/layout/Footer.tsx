import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './Footer.scss';

const iohkLogo = require('../../public/assets/images/iohk-logo.png');
const twitterIcon = require('../../public/assets/images/twitter-icon.png');
const facebookIcon = require('../../public/assets/images/facebook-icon.png');
const youtubeIcon = require('../../public/assets/images/youtube-icon.png');
const newsletterIcon = require('../../public/assets/images/newsletter-icon.png');

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
              <a href="https://twitter.com/inputoutputHK">
                <img src={twitterIcon} className={styles.twitterIcon} />
              </a>
              <a href="https://www.facebook.com/iohk.io/">
                <img src={facebookIcon} className={styles.facebookIcon} />
              </a>
              <a href="https://www.youtube.com/channel/UCBJ0p9aCW-W82TwNM-z3V2w">
                <img src={youtubeIcon} className={styles.youtubeIcon} />
              </a>
              <a href="https://iohk.io/en/blog">
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
              <a
                className={styles.highlightedLink}
                href="https://github.com/input-output-hk/cardano-sl"
              >
                Open Source
              </a>{' '}
              project.
            </h5>
            <div className={styles.cardanoText}>
              Cardano is a software platform ONLY and does not conduct any
              independent diligence on or substantive review of any blockchain ,
              digital currency, cryptocurrency or associated technology. Your
              use of this website and software is entirely at your own risk, and
              this website is provided on an "as is" basis and for reference
              only.
            </div>
          </div>
          <div className={styles.footerMenusContainer}>
            <div className={styles.aboutCardanoMenuContainer}>
              <h5 className={styles.aboutCardanoTitle}>More about Cardano</h5>
              <ul className={styles.aboutCardanoMenu}>
                <li>
                  <a href={'https://shelleyexplorer.cardano.org/'}>
                    Shelley Explorer
                  </a>
                </li>
                <li>
                  <a href={'https://cardanofoundation.org/'}>
                    Cardano Foundation
                  </a>
                </li>
                <li>
                  <a href={'https://cardanodocs.com/'}>Documentation</a>
                </li>
                <li>
                  <a href={'https://github.com/input-output-hk/cardano-sl'}>
                    Cardano SL Source
                  </a>
                </li>
                <li>
                  <a href={'https://whycardano.com/'}>Why Cardano</a>
                </li>
                <li>
                  <a href={'https://www.cardano.org/en/ouroboros/'}>
                    Ouroboros Algorithm
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.joinTheCommunityMenuContainer}>
              <h5 className={styles.joinTheCommunityTitle}>
                Join the community
              </h5>
              <ul className={styles.joinTheCommunityMenu}>
                <li>
                  <a href={'https://www.cardano.org/en/home/'}>
                    Cardano Community
                  </a>
                </li>
                <li>
                  <a href={'https://t.me/CardanoAnnouncements/'}>
                    Cardano Chat
                  </a>
                </li>
                <li>
                  <a href={'https://forum.cardano.org/'}>Cardano Forum</a>
                </li>
                <li>
                  <a href={'https://www.reddit.com/r/cardano/'}>
                    Cardano Reddit
                  </a>
                </li>
                <li>
                  <a
                    href={
                      'https://www.youtube.com/channel/UCbQ9vGfezru1YRI1zDCtTGg'
                    }
                  >
                    Cardano Foundation Youtube
                  </a>
                </li>
                <li>
                  <a href={'https://twitter.com/CardanoStiftung'}>
                    Cardano Foundation Twitter
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
