import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandType } from '../source/common/constants';
import Header from '../source/features/widgets/header/components/Header';
import { PaddingDecorator } from './support/PaddingDecorator';

storiesOf('Header', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Header', () => <Header withSearch brandType={BrandType.ENLARGED} />);
