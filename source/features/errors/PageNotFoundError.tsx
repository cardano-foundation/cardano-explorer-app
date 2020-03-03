import React, { Component } from 'react';
import { LocalizedLink } from '../navigation/ui/LocalizedLink';
import styles from './PageNotFoundError.module.scss';

export interface IErrorProps {
  notFoundTitle: string;
  notFoundText: string;
}

export default class Error extends Component<IErrorProps> {
  public render() {
    const { notFoundTitle, notFoundText } = this.props;

    return (
      <div className={styles.errorContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.errorCode}>Error code:</div>
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
            <LocalizedLink href="/">
              <a className={styles.bottomContainerLink}>Blockchain Explorer</a>
            </LocalizedLink>
            <div className={styles.bottomContainerLinksSeparator} />
            <a
              href="https://help.cardano.org/"
              className={styles.bottomContainerLink}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    );
  }
}
