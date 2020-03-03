import Head from 'next/head';
import React from 'react';
import { BrandType } from '../../constants';
import { PageComponentWithStaticLayout } from '../../lib/types';
import { Footer, Header, Layout } from '../../widgets/layout';
import { useI18nFeature } from '../i18n/context';
import styles from './ErrorPage.module.scss';
import Error from './PageNotFoundError';
const ContainerBackground = require('../../public/assets/images/error/hub-tripple.svg');

const ErrorPage: PageComponentWithStaticLayout = () => {
  const { translate } = useI18nFeature().store;
  return (
    <>
      <Head>
        <title>{translate('404:document.title')}</title>
      </Head>
      <Header brandType={BrandType.ENLARGED} />
      <Error
        notFoundTitle={translate('404:error.title')}
        notFoundText={translate('404:error.description')}
      />
      <Footer />
    </>
  );
};

const StaticLayout = (props: { children?: React.ReactNode }) => {
  return (
    <>
      <div className={styles.topBackgroundContainer} />
      <ContainerBackground className={styles.errorContainerBackground} />
      <div className={styles.bottomBackgroundContainer} />
      <Layout>
        <div className={styles.errorContainerLayout}>{props.children}</div>
      </Layout>
    </>
  );
};

ErrorPage.getStaticLayout = () => StaticLayout;

export default ErrorPage;
