import { storiesOf } from '@storybook/react';
import React from 'react';
import TransactionInfo from '../source/features/transactions/components/TransactionInfo';
// import TransactionList from '../source/features/transactions/components/TransactionList';

import { ThemeDecorator } from './support/ThemeDecorator';

const transactionInfo = {
  address:
    'DdzFFzCqrhshP3eXMp6T6yBAurVd1cJsD8WHg7BbBwNy3AVN2k5jqDPENM9U4zHX5mqdZWxbELWtQnc8dzsM9f8k1dEiuMW9aDU1AGes',
  block: 11044,
  epoch: 48,
  fee: 0.171246,
  receivedTime: 1470006392000,
  slot: 11044,
  totalOutput: 224909.277897
};

/*const transactions = [
  {
    amounts: [661765.123, 4523.1163],
    currentAddress:
      'DdzFFzCqrhshP3eXMp6T6yBAurVd1cJsD8WHg7BbBwNy3AVN2k5jqDPENM9U4zHX5mqdZWxbELWtQnc8dzsM9f8k1dEiuMW9aDU1AGes',
    id: 'Ae2tdPwUPEZ9PxJFs8BbheDEkj4R626Bq6Ci7x3w1esZHPfhoUttUPz4oPE',
    receivers: [
      'Ae2tdPwUPEZ9PxJFs8BbheDEkj4R626Bq6Ci7x3w1esZHPfhoUttUPz4oPE',
      'DdzFFzCqrht8NiQRTwp364FjCMZCbGHJpWHoNWdCPYauG62fn3MirWdRyoChgURCLU2Vv8GqadRVkpu7e932ZtLKHCaE4rpy65R2PYuq',
    ],
    senders: [
      'b0bfe281b8e60a67142497c83a3ba8d6cd46781001ed26ce8a2ca907b4059111',
    ],
    transferredAt: 1470006392000,
  },
  {
    amounts: [345.0, 332402.896790],
    currentAddress:
      'DdzFFzCqrhshP3eXMp6T6yBAurVd1cJsD8WHg7BbBwNy3AVN2k5jqDPENM9U4zHX5mqdZWxbELWtQnc8dzsM9f8k1dEiuMW9aDU1AGes',
    id: 'Ae2tdPwUPEZ9PxJFs8BbheDEkj4R626Bq6Ci7x3w1esZHPfhoUttUPz4oPE',
    receivers: [
      'Ae2tdPwUPEZ9PxJFs8BbheDEkj4R626Bq6Ci7x3w1esZHPfhoUttUPz4oPE',
      'DdzFFzCqrht8NiQRTwp364FjCMZCbGHJpWHoNWdCPYauG62fn3MirWdRyoChgURCLU2Vv8GqadRVkpu7e932ZtLKHCaE4rpy65R2PYuq',
    ],
    senders: [
      'b0bfe281b8e60a67142497c83a3ba8d6cd46781001ed26ce8a2ca907b4059111',
    ],
    transferredAt: 1447094392000,
  },
];*/

storiesOf('Transaction Info', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Transaction Info', () => (
    <div
      style={{
        backgroundColor: '#121326',
        paddingBottom: 10,
        paddingLeft: 247,
        paddingRight: 247,
        paddingTop: 10,
      }}
    >
      <TransactionInfo {...transactionInfo} />
    </div>
  ))
  /*.add('Transactions list', () => (
    <div
      style={{
        backgroundColor: '#121326',
        paddingBottom: 10,
        paddingLeft: 247,
        paddingRight: 247,
        paddingTop: 10,
      }}
    >
      <TransactionList items={transactions} />
    </div>
  ));*/
