import React from 'react';
import Container from '../container/Container';
import styles from './Layout.scss';

interface IProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const Layout = ({ children, header }: IProps) => (
  <div className={styles.content}>
    {header}
    <Container>{children}</Container>
  </div>
);
