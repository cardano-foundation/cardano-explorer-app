import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { environment } from '../environment';
import FooterContainer from '../features/widgets/footer/containers/FooterContainer';
import HeaderContainer from '../features/widgets/header/containers/HeaderContainer';
import NoSearchResult from '../features/widgets/search/components/NoSearchResult';
import Layout from '../layout/Layout';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

let ErrorPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  ErrorPage = () => (
    <NoSSR>
      <Layout hasContainer>
        <HeaderContainer />
        <NoSearchResult />
        <FooterContainer />
      </Layout>
    </NoSSR>
  );
}

export default ErrorPage;
