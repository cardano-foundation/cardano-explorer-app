import React from 'react';
import { useI18nFeature } from '../i18n/context';
import { LocalizedLink } from '../navigation/ui/LocalizedLink';
import styles from './PageNotFoundError.module.scss';

export interface IErrorProps {
  notFoundTitle: string;
  notFoundText: string;
}

export default (props: IErrorProps) => {
  const { translate } = useI18nFeature().store;
  const { notFoundTitle, notFoundText } = props;

  return (
    <div className={styles.errorContainer}>
      <div className={styles.mainContainer}>
        <div className={styles.errorCode}>{translate('404:error.code')}</div>
        <div className={styles.errorCodeSeparator} />
        <div className={styles.errorCodeMessage}>404</div>
      </div>
      <div className={styles.bottomContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.bottomContent}>
            <div className={styles.messageContainer}>
              <span className={styles.message}>{notFoundTitle}</span>
            </div>
            <div className={styles.triangleSign}>
              <div className={styles.straightLine} />
              <div className={styles.triangle}>
                <div className={styles.innerTriangle} />
              </div>
            </div>
          </div>
        </div>
        <p className={styles.bottomContainerText}>{notFoundText}</p>
        <div className={styles.bottomContainerLinks}>
          <LocalizedLink href="">
            <span className={styles.bottomContainerLink}>
              {translate('404:error.explorerTitle')}
            </span>
          </LocalizedLink>
          <div className={styles.bottomContainerLinksSeparator} />
          <a
            href="https://help.cardano.org/"
            className={styles.bottomContainerLink}
          >
            {translate('404:error.support')}
          </a>
        </div>
      </div>
    </div>
  );
};
