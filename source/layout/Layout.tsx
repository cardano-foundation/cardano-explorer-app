import classnames from 'classnames';
import React, { FC, Fragment } from 'react';
import Head from './Head';
import styles from './Layout.scss';

import ContainerComponent from '../features/widgets/container/components/Container';
import PolymorphThemeProvider from '../styles/theme/PolymorphThemeProvider';
import GraphQLProvider from '../utils/graphql/GraphQLProvider';

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
