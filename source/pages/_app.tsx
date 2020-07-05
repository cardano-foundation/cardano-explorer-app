if (process.env.NODE_ENV === 'development') {
  // Must use require here as import statements are only allowed
  // to exist at the top of a file.
  require('preact/debug');
}
import { AppProps } from 'next/app';
import React from 'react';
import NoSSR from 'react-no-ssr';
import '../config/mobx.config';
import ErrorPage from '../features/errors/ErrorPage';
import { I18nFeatureProvider } from '../features/i18n/ui/I18nFeatureProvider';
import { isSupportedLocale } from '../features/i18n/utils';
import { NavigationFeatureProvider } from '../features/navigation/ui/NavigationFeatureProvider';
import { NetworkInfoFeatureProvider } from '../features/network-info/ui/NetworkInfoFeatureProvider';
import { BrowserUpdate } from '../features/outdated-browser/BrowserUpdate';
import { SearchFeatureProvider } from '../features/search/ui/SearchFeatureProvider';
import GraphQLProvider from '../lib/graphql/GraphQLProvider';
import { PageComponentWithStaticLayout } from '../lib/types';
import '../styles/global/index.scss';
import PolymorphThemeProvider from '../styles/theme/PolymorphThemeProvider';
import LoadingSpinner from '../widgets/loading-spinner/LoadingSpinner';
import styles from './_app.module.scss';

const EmptyStaticLayout = (props: { children: React.ReactNode }) => (
  <>{props.children}</>
);

export default function CardanoExplorer({ Component, pageProps }: AppProps) {
  const { locale, statusCode } = pageProps;
  let PageWithOptionalLayout = Component as PageComponentWithStaticLayout;

  // Next.js doesn't know that we only want sub-paths for supported languages
  // so we need to check ourselves:
  if ((locale && !isSupportedLocale(locale)) || statusCode === 404) {
    PageWithOptionalLayout = ErrorPage;
  }
  const StaticLayout =
    PageWithOptionalLayout.getStaticLayout?.() ?? EmptyStaticLayout;
  // Provide global app features that must survive page navigation:
  return (
    <I18nFeatureProvider locale={locale}>
      <GraphQLProvider>
        <PolymorphThemeProvider>
          <NetworkInfoFeatureProvider>
            <NavigationFeatureProvider>
              <SearchFeatureProvider>
                <StaticLayout>
                  <NoSSR
                    onSSR={
                      <LoadingSpinner className={styles.loadingSpinnerMargin} />
                    }
                  >
                    <BrowserUpdate />
                    <Component {...pageProps} />
                  </NoSSR>
                </StaticLayout>
              </SearchFeatureProvider>
            </NavigationFeatureProvider>
          </NetworkInfoFeatureProvider>
        </PolymorphThemeProvider>
      </GraphQLProvider>
    </I18nFeatureProvider>
  );
}
