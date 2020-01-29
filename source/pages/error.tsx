import React from 'react';
import { BrandType } from '../constants';
import Error from '../features/error/Error';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './error.scss';

const ErrorPage = () => (
  <Error
    notFoundTitle="Page not found"
    notFoundText="The requested page cannot be found. It may have been removed or the link can be broken. If you entered a web address please check it was correct and try again."
  />
);

ErrorPage.getStaticLayout = (page: React.ReactNode) => (
  <Layout>
    <div className={styles.errorContainerLayout}>
      <Header brandType={BrandType.ENLARGED} />
      {page}
      <Footer />
    </div>
  </Layout>
);

ErrorPage.pageTitle = 'Cardano Explorer | Error 404';

export default ErrorPage;
