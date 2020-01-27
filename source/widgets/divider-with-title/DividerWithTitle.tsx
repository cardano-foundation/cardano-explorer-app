import React from 'react';
import styles from './DividerWithTitle.module.scss';

export interface IDividerWithTitleProps {
  title: string;
}

const DividerWithTitle = (props: IDividerWithTitleProps) => (
  <div className={styles.dividerContainer}>
    <div className={styles.line} />
    <span className={styles.title}>{props.title}</span>
  </div>
);

export default DividerWithTitle;
