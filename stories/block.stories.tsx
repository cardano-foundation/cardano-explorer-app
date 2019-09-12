import { storiesOf } from '@storybook/react';
import React from 'react';
import Block from '../source/features/block/components/Block';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Block', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Block', () => <Block propFirst={''} propSecond={''} />);
