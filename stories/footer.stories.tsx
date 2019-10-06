import { storiesOf } from '@storybook/react';
import React from 'react';
import Footer from '../source/features/widgets/footer/components/Footer';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Footer', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Footer', () => <Footer propFirst={''} propSecond={''} />);
