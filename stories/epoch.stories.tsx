import { storiesOf } from '@storybook/react';
import React from 'react';
import Epoch from '../source/features/shared/epoch/components/Epoch';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Epoch', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Epoch', () => <Epoch propFirst={''} propSecond={''} />);
