import App from 'next/app';
import React from 'react';
import '../config/mobx.config';
import { environment } from '../environment';
import { NavigationFeatureProvider } from '../features/navigation/ui/NavigationFeatureProvider';
import { NetworkInfoFeatureProvider } from '../features/network-info/ui/NetworkInfoFeatureProvider';
import { SearchFeatureProvider } from '../features/search/ui/SearchFeatureProvider';
import GraphQLProvider from '../lib/graphql/GraphQLProvider';
import { CssVariablesProvider } from '../styles/theme/CssVariablesProvider';
import PolymorphThemeProvider from '../styles/theme/PolymorphThemeProvider';
import { cardanoExplorerTheme } from '../styles/theme/theme';

let app = App;
if (environment.IS_CLIENT) {
  class CardanoExplorer extends App {
    public render() {
      const { Component, pageProps } = this.props;
      // Provide global app features that must survive page navigation:
      return (
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
      );
    }
  }
  app = CardanoExplorer;
}

export default app;
