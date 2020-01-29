import Link from 'next/link';
import React, { Component } from 'react';
import styles from './Error.scss';

const ContainerBackground = require('../../public/assets/images/error/hub-tripple.svg');

export interface IErrorProps {
  notFoundTitle: string;
  notFoundText: string;
}

export default class Error extends Component<IErrorProps> {
  public render() {
    const { notFoundTitle, notFoundText } = this.props;

    return (
      <div className={styles.errorContainer}>
        <ContainerBackground className={styles.errorContainerBackground} />
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
            <Link href="/">
              <a className={styles.bottomContainerLink}>Blockchain Explorer</a>
            </Link>
            <div className={styles.bottomContainerLinksSeparator} />
            <Link href="https://help.cardano.org/">
              <a className={styles.bottomContainerLink}>Contact Support</a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
