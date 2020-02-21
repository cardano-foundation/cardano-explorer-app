import { storiesOf } from '@storybook/react';
import React from 'react';
import styles from '../source/features/errors/ErrorPage.module.scss';
import OutdatedBrowser from '../source/features/outdated-browser/OutdatedBrowser';
import { Footer, Header, Layout } from '../source/widgets/layout';
import { PaddingDecorator } from './support/PaddingDecorator';
const ContainerBackground = require('../source/public/assets/images/error/hub-tripple.svg');

storiesOf('Outdated Browser Page', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Outdated Browser', () => (
    <>
      <div className={styles.topBackgroundContainer} />
      <ContainerBackground className={styles.errorContainerBackground} />
      <div className={styles.bottomBackgroundContainer} />
      <Layout>
        <OutdatedBrowser
          text="Your web browser is out of date"
          updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
        />
        <Footer />
      </Layout>
    </>
  ));
