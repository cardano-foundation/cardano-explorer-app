import { storiesOf } from '@storybook/react';
import React from 'react';
import IndexPage from '../source/pages';

const blocks = [
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 138,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 1,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 139,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 2,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: 'af2800c',
    epoch: 137,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 3,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: '6c9e149',
    epoch: 139,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 4,
  },
  {
    block: 20051,
    createdAt: 1568366883000,
    createdBy: 'e1496c9',
    epoch: 140,
    output: 11189.647356,
    size: 1024,
    slots: 21600,
    transactions: 5,
  },
];

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

storiesOf('Pages', module).add('Main Page', () => (
  <IndexPage epochs={epochs} blocks={blocks} />
));
