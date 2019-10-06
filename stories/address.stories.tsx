import { storiesOf } from '@storybook/react';
import React from 'react';
import AddressInfo from '../source/features/address/components/AddressInfo';
import TransactionList from '../source/features/transactions/components/TransactionList';

import { ThemeDecorator } from './support/ThemeDecorator';

const addressInfo = {
  address:
    'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
  finalBalance: 0.897277,
  transactions: 2,
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
];

storiesOf('Address', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Address Info', () => (
    <div
      style={{
        backgroundColor: '#121326',
        paddingBottom: 10,
        paddingLeft: 247,
        paddingRight: 247,
        paddingTop: 10,
      }}
    >
      <AddressInfo {...addressInfo} />
    </div>
  ))
  .add('Transactions', () => (
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
  ));
