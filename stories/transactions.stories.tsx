import { storiesOf } from '@storybook/react';
import React from 'react';
import TransactionInfo from '../source/features/transactions/components/TransactionInfo';
import TransactionList from '../source/features/transactions/components/TransactionList';
import TransactionSummary from '../source/features/transactions/components/TransactionSummary';
import { PaddingDecorator } from './support/PaddingDecorator';

const transactionSummary = {
  address:
    'DdzFFzCqrhshP3eXMp6T6yBAurVd1cJsD8WHg7BbBwNy3AVN2k5jqDPENM9U4zHX5mqdZWxbELWtQnc8dzsM9f8k1dEiuMW9aDU1AGes',
  block: {
    id: '5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb',
    number: 11044,
  },
  epoch: 48,
  fee: 0.171246,
  id: 'b81c5239789f54e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196',
  receivedTime: 1470006392000,
  slot: 11044,
  totalOutput: 224909.277897,
};

const transactions = [
  {
    amounts: [224258.252597, 651.0253],
    currentAddress:
      'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
    id: 'b81c5239789f54e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196',
    receivers: [
      'DdzFFzlCqrhsktcrocpQugfgfgfgfgfhdfklfjsjflsjfldsjfjdsljfdsljfdjsRBprA4cWim7yuigXuc5QEw',
      'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
    ],
    senders: [
      'XAcK5MmJmPoUqE3W82dfgfqipijfsldjldjghhsddsFgq3oSydTkkW3HsazNhbt',
    ],
    transferredAt: 1570095392000,
  },
  {
    amounts: [100.0, 224602.897277],
    currentAddress:
      'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
    id: '4e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196b81c5239789f5',
    receivers: [
      'XAcK5MmJmPoUqE3W82fdgfgjowuriojejrwljrkljljsfdgFgq3oSydTkkW3HsazNhbt',
      'VrPU8FADdzFFzCqrht7PioureojljdfhsjgjdsfjdslqQhAPY4ty4jYSgF1mC22ifA',
    ],
    senders: [
      'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
    ],
    transferredAt: 1570094392000,
  },
  {
    amounts: [120.0, 24602.897277],
    currentAddress:
      'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
    id: '4e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196b81c5239789f6',
    receivers: [
      'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69',
      'XAcK5MmJmPoUqE3W82fdgfgjowuriojejrwljrkljljsfdgFgq3oSydTkkW3HsazNhbt',
      'VrPU8FADdzFFzCqrht7PioureojljdfhsjgjdsfjdslqQhAPY4ty4jYSgF1mC22ifA',
    ],
    senders: [
      'XAcK5MmJmPoUqE3W82fdgfgjowuriojejrwljrkljljsfdgFgq3osjgjdsfjdslqQhAPY4ty4jYSgF1',
    ],
    transferredAt: 1545694397000,
  },
];

storiesOf('Transactions', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Transaction Info', () => (
    <TransactionInfo title="Transaction" {...transactions[0]} />
  ))
  .add('Transaction Summary', () => (
    <TransactionSummary
      networkBlockHeight={11044 + 100}
      title="Transaction Summary"
      transaction={transactionSummary}
    />
  ))
  .add('Transaction List', () => (
    <TransactionList title="Transactions" items={transactions} />
  ));
