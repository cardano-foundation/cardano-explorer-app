import classnames from 'classnames';
import React from 'react';
import { environment } from '../../environment';
import { useI18nFeature } from '../../features/i18n/context';
import styles from './Footer.module.scss';

const iohkLogo = require('../../public/assets/images/iohk-logo.png');
const twitterIcon = require('../../public/assets/images/twitter-icon.png');
const facebookIcon = require('../../public/assets/images/facebook-icon.png');
const youtubeIcon = require('../../public/assets/images/youtube-icon.png');
const newsletterIcon = require('../../public/assets/images/newsletter-icon.png');
const GitIcon = require('../../public/assets/images/git-icon.svg');

interface IFooterProps {
  rootClassname?: string;
}
export const Footer = (props: IFooterProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <footer
      className={classnames([styles.footerContainer, props.rootClassname])}
    >
      <div className={styles.footerContent}>
        <div className={styles.footerTopContainer}>
          <div className={styles.footerTopContainerLeft}>
            <p className={styles.copyright}>
              © IOHK 2015 - {new Date().getFullYear()}
            </p>
            <a href={environment.PACKAGE.HOMEPAGE} className={styles.gitLink}>
              <GitIcon className={styles.gitIcon} />
            </a>
            <p>{environment.PACKAGE.VERSION}</p>
          </div>
          <div className={styles.logos}>
            <div className={styles.logoText}>
              <a href="https://iohk.io/">
                <img src={iohkLogo} className={styles.iohkLogo} />
              </a>
              <p className={styles.iohkText}>{translate('footer.iohk')}</p>
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
              {translate('footer.textTitle')}{' '}
              <a
                className={styles.highlightedLink}
                href="https://github.com/input-output-hk"
              >
                {translate('footer.openSource')}
              </a>{' '}
              {translate('footer.project')}
            </h5>
            <div className={styles.cardanoText}>
              {translate('footer.cardanoText')}
            </div>
          </div>
          <div className={styles.footerMenusContainer}>
            <div className={styles.aboutCardanoMenuContainer}>
              <h5 className={styles.aboutCardanoTitle}>
                {translate('footer.moreAbout')}
              </h5>
              <ul className={styles.aboutCardanoMenu}>
                <li>
                  <a href={'https://cardanofoundation.org/'}>
                    {translate('footer.cardanoFoundation')}
                  </a>
                </li>
                <li>
                  <a href={'https://cardanodocs.com/'}>
                    {translate('footer.documentation')}
                  </a>
                </li>
                <li>
                  <a href={'https://github.com/input-output-hk'}>
                    {translate('footer.cardanoSource')}
                  </a>
                </li>
                <li>
                  <a href={'https://whycardano.com/'}>
                    {translate('footer.whyCardano')}
                  </a>
                </li>
                <li>
                  <a href={'https://www.cardano.org/en/ouroboros/'}>
                    {translate('footer.ouroborosAlgorithm')}
                  </a>
                </li>
                <li>
                  <a href={'https://iohk.zendesk.com/hc/en-us/requests/new'}>
                    {translate('footer.submitASupportRequest')}
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.joinTheCommunityMenuContainer}>
              <h5 className={styles.joinTheCommunityTitle}>
                {translate('footer.joinCommunity')}
              </h5>
              <ul className={styles.joinTheCommunityMenu}>
                <li>
                  <a href={'https://www.cardano.org/en/home/'}>
                    {translate('footer.cardanoCommunity')}
                  </a>
                </li>
                <li>
                  <a href={'https://t.me/CardanoAnnouncements/'}>
                    {translate('footer.cardanoChat')}
                  </a>
                </li>
                <li>
                  <a href={'https://forum.cardano.org/'}>
                    {translate('footer.cardanoForum')}
                  </a>
                </li>
                <li>
                  <a href={'https://www.reddit.com/r/cardano/'}>
                    {translate('footer.cardanoReddit')}
                  </a>
                </li>
                <li>
                  <a
                    href={
                      'https://www.youtube.com/channel/UCbQ9vGfezru1YRI1zDCtTGg'
                    }
                  >
                    {translate('footer.cardanoFoundationYoutube')}
                  </a>
                </li>
                <li>
                  <a href={'https://twitter.com/CardanoStiftung'}>
                    {translate('footer.cardanoFoundationTwitter')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
