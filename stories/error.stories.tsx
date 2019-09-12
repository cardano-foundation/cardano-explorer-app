import { storiesOf } from '@storybook/react';
import React from 'react';
import Error from '../source/features/error/components/Error';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Error', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Error', () => <Error propFirst={''} propSecond={''} />);
