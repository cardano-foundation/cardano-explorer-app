import { storiesOf } from '@storybook/react';
import { noop } from 'lodash';
import React from 'react';
import { BrandType } from '../source/common/constants';
import { Footer, Header } from '../source/layout';
import { PaddingDecorator } from './support/PaddingDecorator';

storiesOf('Layout|Header', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Header', () => (
    <Header
      withSearch
      brandType={BrandType.ENLARGED}
      searchProps={{ onSearch: noop }}
    />
  ));

storiesOf('Layout|Footer', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Footer', () => <Footer />);
