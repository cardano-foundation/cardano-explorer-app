import React from 'react';
import styles from './PaddingDecorator.scss';

interface IProps {
  children: React.ReactNode;
}

export const PaddingDecorator = ({ children }: IProps) => (
  <div className={styles.paddingContainer}>{children}</div>
);
