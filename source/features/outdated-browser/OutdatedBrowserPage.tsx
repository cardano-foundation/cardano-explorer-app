import Head from 'next/head';
import React from 'react';
import { StaticLayoutProps } from '../../lib/types';
import { Footer, Layout } from '../../widgets/layout';
import { useI18nFeature } from '../i18n/context';
import { i18nInitialProps } from '../i18n/utils';
import OutdatedBrowser from './OutdatedBrowser';

export const OutdatedBrowserPage = () => {
  const { translate } = useI18nFeature().store;
  return (
    <OutdatedBrowser
      text={translate('outdatedBrowser.text')}
      updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
    />
  );
};

const StaticLayout = (props: StaticLayoutProps) => {
  const { translate } = useI18nFeature().store;
  return (
    <Layout>
      <Head>
        <title>{translate('outdatedBrowser.pageTitle')}</title>
      </Head>
      {props.children}
      <Footer />
    </Layout>
  );
};

OutdatedBrowserPage.getStaticLayout = () => StaticLayout;
OutdatedBrowserPage.getInitialProps = i18nInitialProps;
