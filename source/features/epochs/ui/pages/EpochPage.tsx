import Head from 'next/head';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StaticLayoutProps } from '../../../../lib/types';
import { ShrinkedHeaderLayout } from '../../../../widgets/layout/ShrinkedHeaderLayout';
import { BlocksFeatureProvider } from '../../../blocks/ui/BlocksFeatureProvider';
import { i18nInitialProps } from '../../../i18n/utils';
import EpochsSearchResult from '../../../search/ui/EpochsSearchResult';
import styles from './EpochPage.module.scss';

export const EpochPage = () => (
  <div className={styles.epochLayout}>
    <BlocksFeatureProvider>
      <EpochsSearchResult />
    </BlocksFeatureProvider>
  </div>
);

const StaticLayout = (props: StaticLayoutProps) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t('epoch.pageTitle')}</title>
      </Head>
      <ShrinkedHeaderLayout>{props.children}</ShrinkedHeaderLayout>
    </>
  );
};

EpochPage.getStaticLayout = () => StaticLayout;
EpochPage.getInitialProps = i18nInitialProps;
