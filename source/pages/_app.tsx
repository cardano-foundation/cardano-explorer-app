import App from 'next/app';
import {
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils';
import Head from 'next/head';
import React from 'react';
import NoSSR from 'react-no-ssr';
import '../config/mobx.config';
import ErrorPage from '../features/errors/ErrorPage';
import { NavigationFeatureProvider } from '../features/navigation/ui/NavigationFeatureProvider';
import { NetworkInfoFeatureProvider } from '../features/network-info/ui/NetworkInfoFeatureProvider';
import { BrowserUpdate } from '../features/outdated-browser/BrowserUpdate';
import { SearchFeatureProvider } from '../features/search/ui/SearchFeatureProvider';
import GraphQLProvider from '../lib/graphql/GraphQLProvider';
import '../styles/global/index.scss';
import PolymorphThemeProvider from '../styles/theme/PolymorphThemeProvider';
import LoadingSpinner from '../widgets/loading-spinner/LoadingSpinner';

type PageComponentWithStaticLayout = NextComponentType<NextPageContext, any> & {
  getStaticLayout?: (page: React.ReactNode) => JSX.Element;
  pageTitle: string;
};

class CardanoExplorer extends App {
  public render() {
    let { pageProps } = this.props;
    let Component = this.props.Component as PageComponentWithStaticLayout;
    if (pageProps && pageProps.statusCode && pageProps.statusCode === 404) {
      pageProps = {};
      Component = ErrorPage;
    }
    const wrapInStaticLayout =
      Component.getStaticLayout || ErrorPage.getStaticLayout;
    // Provide global app features that must survive page navigation:
    return (
      <GraphQLProvider>
        <PolymorphThemeProvider>
          <NetworkInfoFeatureProvider>
            <NavigationFeatureProvider>
              <SearchFeatureProvider>
                {wrapInStaticLayout(
                  <NoSSR onSSR={<LoadingSpinner />}>
                    <BrowserUpdate />
                    <Head>
                      {Component.pageTitle && (
                        <title>{Component.pageTitle}</title>
                      )}
                    </Head>
                    <Component {...pageProps} />
                  </NoSSR>
                )}
              </SearchFeatureProvider>
            </NavigationFeatureProvider>
          </NetworkInfoFeatureProvider>
        </PolymorphThemeProvider>
      </GraphQLProvider>
    );
  }
}

export default CardanoExplorer;
