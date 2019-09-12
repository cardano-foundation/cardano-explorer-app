import { storiesOf } from '@storybook/react';
import React from 'react';
import Epochs from '../source/features/shared/epochs/components/Epochs';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Epochs', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Epochs', () => <Epochs propFirst={''} propSecond={''} />);
