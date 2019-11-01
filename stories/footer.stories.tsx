import { storiesOf } from '@storybook/react';
import React from 'react';
import { Footer } from '../source/widgets/layout';
import { PaddingDecorator } from './support/PaddingDecorator';

storiesOf('Footer', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Footer', () => <Footer />);
