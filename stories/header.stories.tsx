import { storiesOf } from '@storybook/react';
import { noop } from 'lodash';
import React from 'react';
import { BrandType } from '../source/common/constants';
import Header from '../source/features/widgets/header/components/Header';
import { PaddingDecorator } from './support/PaddingDecorator';

storiesOf('Header', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Header', () => (
    <Header
      withSearch
      brandType={BrandType.ENLARGED}
      searchProps={{ onSearch: noop }}
    />
  ));
