import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { i18nInitialProps } from '../../../i18n/utils';
import { TransactionSearchResult } from '../../../search/ui/TransactionSearchResult';

export const TransactionPage = () => <TransactionSearchResult />;

const StaticLayout = (props: StaticLayoutProps) => {
  const { t } = useTranslation();
  return (
    <ShrinkedHeaderLayout>
      <Head>
        <title>{t('transaction.pageTitle')}</title>
      </Head>
      {props.children}
    </ShrinkedHeaderLayout>
  );
};

TransactionPage.getStaticLayout = () => StaticLayout;
TransactionPage.getInitialProps = i18nInitialProps;
