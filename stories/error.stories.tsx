import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandType } from '../source/constants';
import styles from '../source/features/errors/ErrorPage.module.scss';
import Error from '../source/features/errors/PageNotFoundError';
import { Footer, Header, Layout } from '../source/widgets/layout';
const ContainerBackground = require('../source/public/assets/images/error/hub-tripple.svg');

storiesOf('Error Page', module).add('Error', () => (
  <>
    <div className={styles.topBackgroundContainer} />
    <ContainerBackground className={styles.errorContainerBackground} />
    <div className={styles.bottomBackgroundContainer} />
    <Layout>
      <div className={styles.errorContainerLayout}>
        <Header brandType={BrandType.ENLARGED} />
        <Error
          notFoundTitle="Page not found"
          notFoundText="The requested page cannot be found. It may have been removed or the link can be broken. If you entered a web address please check it was correct and try again."
        />
        <Footer />
      </div>
    </Layout>
  </>
));
