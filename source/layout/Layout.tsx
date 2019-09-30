import React, { Fragment } from 'react';
import classnames from 'classnames';
import Head from './Head';
import PolymorphThemeProvider from '../styles/theme/PolymorphThemeProvider';
import GraphQLProvider from '../utils/graphql/GraphQLProvider';
import styles from './Layout.scss';

interface IProps {
  children: React.ReactNode;
  hasContainer?: boolean;
}

const Layout = ({ children, hasContainer }: IProps) => {
  const containerStyles = classnames([hasContainer ? styles.container : null]);

  return (
    <Fragment>
      <Head />
      <GraphQLProvider>
        <PolymorphThemeProvider>
          <div className={styles.content}>
            <div className={containerStyles}>{children}</div>
          </div>
        </PolymorphThemeProvider>
      </GraphQLProvider>
    </Fragment>
  );
};

export default Layout;
