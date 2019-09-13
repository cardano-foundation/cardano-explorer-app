import { storiesOf } from '@storybook/react';
import React from 'react';
import Header from '../source/features/shared/header/components/Header';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Header', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Header', () => <Header title="header" />);
