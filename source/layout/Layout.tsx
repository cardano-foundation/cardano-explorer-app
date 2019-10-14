import classnames from 'classnames';
import React, { Fragment, FC } from 'react';
import Head from './Head';
import styles from './Layout.scss';

import PolymorphThemeProvider from '../styles/theme/PolymorphThemeProvider';
import GraphQLProvider from '../utils/graphql/GraphQLProvider';
import ContainerComponent from '../features/widgets/container/components/Container';

interface IProps {
  children: React.ReactNode;
  hasContainer?: boolean;
}

const Layout = ({ children, hasContainer }: IProps) => {
  const Container: any = hasContainer ? ContainerComponent : Fragment;

  return (
    <Fragment>
      <Head />
      <GraphQLProvider>
        <PolymorphThemeProvider>
          <div className={styles.content}>
            <Container>{children}</Container>
          </div>
        </PolymorphThemeProvider>
      </GraphQLProvider>
    </Fragment>
  );
};

export default Layout;
