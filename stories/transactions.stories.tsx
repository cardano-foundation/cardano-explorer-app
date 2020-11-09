import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import UnmoderatedDataConsented from '../source/features/stake-pools/components/UnmoderatedDataConsented';
import UnmoderatedDataWarning from '../source/features/stake-pools/components/UnmoderatedDataWarning';
import TransactionInfo from '../source/features/transactions/components/TransactionInfo';
import TransactionList from '../source/features/transactions/components/TransactionList';
import { ITransactionDetails } from '../source/features/transactions/types';
import { PaddingDecorator } from './support/PaddingDecorator';

const currentAddress =
  'DdzFFzCqrhshP3eXMp6T6yBAurVd1cJsD8WHg7BbBwNy3AVN2k5jqDPENM9U4zHX5mqdZWxbELWtQnc8dzsM9f8k1dEiuMW9aDU1AGes';

export const transactions: ITransactionDetails[] = [
  {
    block: {
      epoch: 48,
      id: '5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb',
      number: 11044,
      slot: 11044,
    },
    deposit: '171246',
    fee: '171246',
    id: 'b81c5239789f54e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196',
    includedAt: new Date(1570095392000),
    inputs: [
      {
        address:
          'XAcK5MmJmPoUqE3W82dfgfqipijfsldjldjghhsddsFgq3oSydTkkW3HsazNhbt',
        sourceTxId:
          'b81c5239789f54e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196',
        sourceTxIndex: 0,
        value: '224251742344',
      },
    ],
    outputs: [
      {
        address:
          'DdzFFzlCqrhsktcrocpQugfgfgfgfgfhdfklfjsjflsjfldsjfjdsljfdsljfdjsRBprA4cWim7yuigXuc5QEw',
        index: 0,
        value: '224258252597',
      },
      {
        address:
          'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
        index: 1,
        value: '6510253',
      },
    ],
    totalOutput: '224909.277897',
    withdrawals: [
      {
        address: 'DdzFFzlCqrhsktcrocpQugfgfgfgfgfhdfklfjsjflsjfldsjfjdsljfdsljfdjsRBprA4cWim7yuigXuc5QEw',
        value: '6510253',
      }
    ],
  },
  {
    block: {
      epoch: 48,
      id: '5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb',
      number: 11044,
      slot: 11044,
    },
    deposit: '171246',
    fee: '171246',
    id: '4e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196b81c5239789f5',
    includedAt: new Date(1570095392000),
    inputs: [
      {
        address:
          'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
        sourceTxId:
          'b81c5239789f54e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196',
        sourceTxIndex: 1,
        value: '224251742344',
      },
    ],
    outputs: [
      {
        address:
          'XAcK5MmJmPoUqE3W82fdgfgjowuriojejrwljrkljljsfdgFgq3oSydTkkW3HsazNhbt',
        index: 0,
        value: '100000000',
      },
      {
        address:
          'VrPU8FADdzFFzCqrht7PioureojljdfhsjgjdsfjdslqQhAPY4ty4jYSgF1mC22ifA',
        index: 1,
        value: '224702897277',
      },
    ],
    totalOutput: '224909.277897',
    withdrawals: [
      {
        address: 'DdzFFzlCqrhsktcrocpQugfgfgfgfgfhdfklfjsjflsjfldsjfjdsljfdsljfdjsRBprA4cWim7yuigXuc5QEw',
        value: '6510253',
      }
    ],
  },
  {
    block: {
      epoch: 48,
      id: '5f20df933584822601f9e3f8c024eb5eb252fe8cefb24d1317dc3d432e940ebb',
      number: 11044,
      slot: 11044,
    },
    deposit: '171246',
    fee: '171246',
    id: '4e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196b81c5239789f6',
    includedAt: new Date(1570095392000),
    inputs: [
      {
        address:
          'XAcK5MmJmPoUqE3W82fdgfgjowuriojejrwljrkljljsfdgFgq3osjgjdsfjdslqQhAPY4ty4jYSgF1',
        sourceTxId:
          'b81c5239789f54e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196',
        sourceTxIndex: 2,
        value: '224251742344',
      },
    ],
    outputs: [
      {
        address:
          'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69',
        index: 0,
        value: '120000000',
      },
      {
        address:
          'XAcK5MmJmPoUqE3W82fdgfgjowuriojejrwljrkljljsfdgFgq3oSydTkkW3HsazNhbt',
        index: 1,
        value: '24602.897277',
      },
    ],
    totalOutput: '24613897277',
    withdrawals: [
      {
        address: 'DdzFFzlCqrhsktcrocpQugfgfgfgfgfhdfklfjsjflsjfldsjfjdsljfdsljfdjsRBprA4cWim7yuigXuc5QEw',
        value: '6510253',
      }
    ],
  },
];

storiesOf('Transactions', module)
  .addDecorator((story) => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Transaction Info', () => (
    <TransactionInfo
      highlightAddress={currentAddress}
      title="Transaction"
      {...transactions[0]}
    />
  ))
  .add('Transaction Info (Details)', () => (
    <TransactionInfo
      highlightAddress={currentAddress}
      title="Transaction"
      showDetails
      {...transactions[0]}
    />
  ))
  .add('Transaction List', () => (
    <TransactionList
      title="Transactions"
      isLoading={false}
      items={transactions.map((t) => ({
        ...t,
        currentAddress,
        networkBlockHeight: 11044 + 100,
        title: 'Transaction',
      }))}
    />
  ))
  .add('UnmoderatedDataWarning', () => (
    <UnmoderatedDataWarning
      type="transactions"
      onAcceptUnmoderatedData={action('onAcceptUnmoderatedData')}
    />
  ))
  .add('UnmoderatedDataConsented', () => <UnmoderatedDataConsented type="transaction" />);
