import App from 'next/app';
import {
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils';
import Head from 'next/head';
import React from 'react';
import NoSSR from 'react-no-ssr';
import '../config/mobx.config';
import { NavigationFeatureProvider } from '../features/navigation/ui/NavigationFeatureProvider';
import { NetworkInfoFeatureProvider } from '../features/network-info/ui/NetworkInfoFeatureProvider';
import { SearchFeatureProvider } from '../features/search/ui/SearchFeatureProvider';
import GraphQLProvider from '../lib/graphql/GraphQLProvider';
import { CssVariablesProvider } from '../styles/theme/CssVariablesProvider';
import PolymorphThemeProvider from '../styles/theme/PolymorphThemeProvider';
import { cardanoExplorerTheme } from '../styles/theme/theme';

type PageComponentWithStaticLayout = NextComponentType<NextPageContext, any> & {
  getStaticLayout?: (page: React.ReactNode) => JSX.Element;
};

class CardanoExplorer extends App {
  public render() {
    const { pageProps } = this.props;
    const Component = this.props.Component as PageComponentWithStaticLayout;
    const emptyLayout = (page: JSX.Element) => page;
    const wrapInStaticLayout = Component.getStaticLayout || emptyLayout;
    // Provide global app features that must survive page navigation:
    return wrapInStaticLayout(
      <NoSSR>
        <Head>
          {process.env.NODE_ENV !== 'production' && (
            <link
              rel="stylesheet"
              type="text/css"
              href={`/_next/static/css/styles.chunk.css?v=${Date.now()}`}
            />
          )}
        </Head>
        <GraphQLProvider>
          <CssVariablesProvider variables={cardanoExplorerTheme}>
            <PolymorphThemeProvider>
              <NetworkInfoFeatureProvider>
                <NavigationFeatureProvider>
                  <SearchFeatureProvider>
                    <Component {...pageProps} />
                  </SearchFeatureProvider>
                </NavigationFeatureProvider>
              </NetworkInfoFeatureProvider>
            </PolymorphThemeProvider>
          </CssVariablesProvider>
        </GraphQLProvider>
      </NoSSR>
    );
  }
}

export default CardanoExplorer;
