import classnames from 'classnames';
import React, { Component } from 'react';
import styles from './LoadingSpinner.scss';

const SpinnerBig = require('../../public/assets/images/spinner-dark-big.inline.svg');
const SpinnerSmall = require('../../public/assets/images/spinner-dark.inline.svg');

export interface ILoadingSpinnerProps {
  big?: boolean;
  medium?: boolean;
}

export default class LoadingSpinner extends Component<ILoadingSpinnerProps> {
  public root?: HTMLDivElement | any;

  public render() {
    const { big, medium } = this.props;

    const componentClasses = classnames([
      styles.component,
      big ? styles.big : null,
      medium ? styles.medium : null,
      !big && !medium ? styles.small : null,
    ]);

    return (
      <div
        className={componentClasses}
        ref={div => {
          this.root = div;
        }}
      >
        {big && <SpinnerBig className={styles.icon} />}
        {!big && <SpinnerSmall className={styles.icon} />}
      </div>
    );
  }
}
