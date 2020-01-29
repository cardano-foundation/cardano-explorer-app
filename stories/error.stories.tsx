import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandType } from '../source/constants';
import styles from '../source/features/errors/ErrorPage.module.scss';
import Error from '../source/features/errors/PageNotFoundError';
import { Header } from '../source/widgets/layout';
import { PaddingDecorator } from './support/PaddingDecorator';

const notFoundTitle = 'Page not found';
const notFoundText =
  'The requested page cannot be found. It may have been removed or the link can be broken. If you entered a web address please check it was correct and try again.';

storiesOf('Error Page', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Error', () => (
    <div className={styles.errorContainerLayout}>
      <Header brandType={BrandType.ENLARGED} />
      <Error notFoundTitle={notFoundTitle} notFoundText={notFoundText} />
    </div>
  ));
