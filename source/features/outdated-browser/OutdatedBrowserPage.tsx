import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StaticLayoutProps } from '../../lib/types';
import { Footer, Layout } from '../../widgets/layout';
import { i18nInitialProps } from '../i18n/utils';
import OutdatedBrowser from './OutdatedBrowser';

export const OutdatedBrowserPage = () => (
  <OutdatedBrowser
    text="Your web browser is out of date"
    updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
  />
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { t } = useTranslation();
  return (
    <Layout>
      <Head>
        <title>{t('outdatedBrowser.pageTitle')}</title>
      </Head>
      {props.children}
      <Footer />
    </Layout>
  );
};

OutdatedBrowserPage.getStaticLayout = () => StaticLayout;
OutdatedBrowserPage.getInitialProps = i18nInitialProps;
