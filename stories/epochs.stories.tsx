import { storiesOf } from '@storybook/react';
import React from 'react';
import EpochList from '../source/features/epochs/components/EpochList';

import { ThemeDecorator } from './support/ThemeDecorator';

const epochs = [
  {
    blocks: 20051,
    epoch: 138,
    output: 11189.647356,
    percentage: 40,
    slots: 21600,
    startedAt: 1568366883000,
    status: 'In progress...',
    transactions: 1,
  },
  {
    blocks: 21045,
    endedAt: 1569144483000,
    epoch: 137,
    output: 0.0,
    slots: 21600,
    startedAt: 1568366883000,
    status: '',
    transactions: 17,
  },
  {
    blocks: 21367,
    endedAt: 1569144483000,
    epoch: 136,
    output: 70090.386627,
    slots: 21600,
    startedAt: 1568366883000,
    status: '',
    transactions: 0,
  },
  {
    blocks: 21073,
    endedAt: 1569144483000,
    epoch: 135,
    output: 8397621.461829,
    slots: 21600,
    startedAt: 1568366883000,
    status: '',
    transactions: 12,
  },
  {
    blocks: 20034,
    endedAt: 1569144483000,
    epoch: 134,
    output: 18.872021,
    slots: 21600,
    startedAt: 1568366883000,
    status: '',
    transactions: 5,
  },
];

storiesOf('Epochs', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Epoch List', () => (
    <div style={{ backgroundColor: '#121326' }}>
      <EpochList items={epochs} />
    </div>
  ));
