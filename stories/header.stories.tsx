import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandType } from '../source/constants';
import { Header } from '../source/widgets/layout/Header';
import { PaddingDecorator } from './support/PaddingDecorator';

storiesOf('Header', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Header', () => <Header brandType={BrandType.ENLARGED} />);
