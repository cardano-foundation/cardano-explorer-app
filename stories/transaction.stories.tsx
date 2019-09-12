import { storiesOf } from '@storybook/react';
import React from 'react';
import Transaction from '../source/features/transaction/components/Transaction';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Transaction', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Transaction', () => <Transaction propFirst={''} propSecond={''} />);
