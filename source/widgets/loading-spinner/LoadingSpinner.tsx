import classnames from 'classnames';
import React, { useRef } from 'react';
import styles from './LoadingSpinner.module.scss';

const SpinnerBig = require('../../public/assets/images/spinner-dark-big.inline.svg');
const SpinnerSmall = require('../../public/assets/images/spinner-dark.inline.svg');

export interface ILoadingSpinnerProps {
  big?: boolean;
  className?: string;
  medium?: boolean;
}

const LoadingSpinner = (props: ILoadingSpinnerProps) => {
  const root = useRef(null);
  const { big, className, medium } = props;

  const componentClasses = classnames([
    styles.component,
    big ? styles.big : null,
    medium ? styles.medium : null,
    !big && !medium ? styles.small : null,
    className,
  ]);

  return (
    <div className={componentClasses} ref={root}>
      {big && <SpinnerBig className={styles.icon} />}
      {!big && <SpinnerSmall className={styles.icon} />}
    </div>
  );
};

export default LoadingSpinner;
