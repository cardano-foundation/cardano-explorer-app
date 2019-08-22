import React from 'react';
import PolymorphThemeProvider from '../features/theme/PolymorphThemeProvider';
import GraphQLProvider from '../utils/graphql/GraphQLProvider';
import styles from './Layout.scss';

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <GraphQLProvider>
      <PolymorphThemeProvider>
        <div className={styles.content}>{children}</div>
      </PolymorphThemeProvider>
    </GraphQLProvider>
  );
};

export default Layout;
