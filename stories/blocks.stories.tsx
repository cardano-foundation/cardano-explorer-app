import { storiesOf } from '@storybook/react';
import React from 'react';
import Blocks from '../source/features/shared/blocks/components/Blocks';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Blocks', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Blocks', () => <Blocks propFirst={''} propSecond={''} />);
