import React from 'react';
import { BrandType } from '../../constants';
import { Footer, Header, Layout } from '../../widgets/layout';
import styles from './ErrorPage.module.scss';
import Error from './PageNotFoundError';
const ContainerBackground = require('../../public/assets/images/error/hub-tripple.svg');

const ErrorPage = () => (
  <Error
    notFoundTitle="Page not found"
    notFoundText="The requested page cannot be found. It may have been removed or the link can be broken. If you entered a web address please check it was correct and try again."
  />
);

ErrorPage.getStaticLayout = (page: React.ReactNode) => (
  <>
    <div className={styles.topBackgroundContainer} />
    <ContainerBackground className={styles.errorContainerBackground} />
    <div className={styles.bottomBackgroundContainer} />
    <Layout>
      <div className={styles.errorContainerLayout}>
        <Header brandType={BrandType.ENLARGED} />
        {page}
        <Footer />
      </div>
    </Layout>
  </>
);

ErrorPage.pageTitle = 'Cardano Explorer | Error 404';

export default ErrorPage;
