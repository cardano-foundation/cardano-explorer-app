import { observer } from 'mobx-react-lite';
import { Block } from '../../../../../../generated/typings/graphql-schema';

import styles from './index.scss';

interface IProps {
  footerPropFirst: string;
  footerPropSecond: string;
}

const Footer = (props: IProps) => {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerTopContainer}>
        <p className={styles.copyright}>Cardano {new Date().getFullYear()}</p>
        <div className={styles.logos}>
          <img className={styles.iohkLogo} />
          <p className={styles.iohkText}></p>
          <img className={styles.twitterLogo} />
          <img className={styles.facebookLogo} />
          <img className={styles.youtubeLogo} />
          <img className={styles.newsletterLogo} />
        </div>
      </div>
      <div className={styles.footerMiddleContainer}>
        <hr className={styles.footerSeparator} />
      </div>
      <div className={styles.footerBottomContainer}>
        <div className={styles.cardanoTextContainer}>
          <h5 className={styles.cardanoTextTitle}></h5>
          <p className={styles.cardanoText}></p>
        </div>
        <div className={styles.aboutCardanoMenuContainer}>
          <h5 className={styles.aboutCardanoTitle}></h5>
          <ul className={styles.aboutCardanoMenu}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className={styles.joinTheCommunityMenuContainer}>
          <h5 className={styles.joinTheCommunityTitle}></h5>
          <ul className={styles.joinTheCommunityMenu}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default observer(Footer);
