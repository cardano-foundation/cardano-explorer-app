import classnames from 'classnames';
import React, { Fragment } from 'react';
import Head from './Head';
import styles from './Layout.scss';

import PolymorphThemeProvider from '../styles/theme/PolymorphThemeProvider';
import GraphQLProvider from '../utils/graphql/GraphQLProvider';

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
