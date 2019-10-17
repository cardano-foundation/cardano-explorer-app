import { storiesOf } from '@storybook/react';
import React from 'react';
import Footer from '../source/features/widgets/footer/components/Footer';
import { PaddingDecorator } from './support/PaddingDecorator';

storiesOf('Footer', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Footer', () => <Footer propFirst={''} propSecond={''} />);
