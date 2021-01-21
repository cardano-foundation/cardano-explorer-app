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
    metadata: [
      {
        key: 'meta',
        value: 'Test metadata',
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
        address:
          'DdzFFzlCqrhsktcrocpQugfgfgfgfgfhdfklfjsjflsjfldsjfjdsljfdsljfdjsRBprA4cWim7yuigXuc5QEw',
        value: '6510253',
      },
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
    metadata: [
      {
        key: 'meta',
        value: 'Test metadata',
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
        address:
          'DdzFFzlCqrhsktcrocpQugfgfgfgfgfhdfklfjsjflsjfldsjfjdsljfdsljfdjsRBprA4cWim7yuigXuc5QEw',
        value: '6510253',
      },
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
    metadata: [
      {
        key: 'meta',
        value: 'Test metadata',
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
        address:
          'DdzFFzlCqrhsktcrocpQugfgfgfgfgfhdfklfjsjflsjfldsjfjdsljfdsljfdjsRBprA4cWim7yuigXuc5QEw',
        value: '6510253',
      },
    ],
  },
];

const transactionMA: ITransactionDetails = {
  block: {
    epoch: 781,
    id: 'd13647a327882b9571d78da42c30c127ee8080cd6a3fc685ee2abd047ee399f5',
    number: 274992,
    slot: 5612100,
  },
  burn: [
    {
      assetName: 'ACL',
      policyId: '58e05d50b54013dbf6c9e3469bbfac817f3580d4daf4f4b593b7b185',
      quantity: '1000',
    },
  ],
  deposit: '0',
  fee: '185345',
  id: 'b81c5239789f54e10a3ef736e0981ff07318b2868f77143ea5ffae306c6a9196',
  includedAt: new Date(1570095392000),
  inputs: [
    {
      address:
        'addr_test1qzyh0zdfjmk997fkdrgcm4xmuhcqqd4qgphkmgm3shryrjhkjhp4qfyx33xada55u94c300knphrrgr577gdw5jpc39srpfmlp',
      sourceTxId:
        '139bce85b28b94bef98c306867010f30ea60540088c2ec82bf65bd660d3a32fc',
      sourceTxIndex: 0,
      tokens: [
        {
          assetName: 'machtl2coin',
          policyId: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
          quantity: '490',
        },
        {
          assetName: 'machtlcoin',
          policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
          quantity: '2000',
        },
        {
          assetName: 'ATADAcoin',
          policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
          quantity: '9900',
        },
        {
          assetName: 'ANQACOINS',
          policyId: 'd5837e82ebbcdfb37b5aea45ba78330244aabb045b7472c8bb791045',
          quantity: '10',
        },
        {
          assetName: 'adosia',
          policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
          quantity: '7999999300',
        },
        {
          assetName: 'ACL',
          policyId: '202e0181ea963e2fcd206b1a794ce160afbe120dad5fd30a181d3a24',
          quantity: '1000000000000',
        },
      ],
      value: '491313019',
    },
  ],
  metadata: [
    {
      key: 'meta',
      value: 'Test metadata',
    },
  ],
  mint: [
    {
      assetName: 'machtl2coin',
      policyId: '58e05d50b54013dbf6c9e3469bbfac817f3580d4daf4f4b593b7b185',
      quantity: '5',
    },
  ],
  outputs: [
    {
      address:
        'addr_test1vplgcajn3d922znzumlqzhwmtz5hkgf3c6a3tlqt3mhl6wse6xkt5',
      index: 0,
      tokens: [
        {
          assetName: 'ATADAcoin',
          policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
          quantity: '10',
        },
      ],
      value: '2000000',
    },
    {
      address:
        'ddr_test1qzyh0zdfjmk997fkdrgcm4xmuhcqqd4qgphkmgm3shryrjhkjhp4qfyx33xada55u94c300knphrrgr577gdw5jpc39srpfmlp',
      index: 1,
      tokens: [
        {
          assetName: 'ACL',
          policyId: '202e0181ea963e2fcd206b1a794ce160afbe120dad5fd30a181d3a24',
          quantity: '1000000000000',
        },
        {
          assetName: 'machtl2coin',
          policyId: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
          quantity: '490',
        },
        {
          assetName: 'ATADAcoin',
          policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
          quantity: '9890',
        },
        {
          assetName: 'ANQACOINS',
          policyId: 'd5837e82ebbcdfb37b5aea45ba78330244aabb045b7472c8bb791045',
          quantity: '10',
        },
        {
          assetName: 'machtlcoin',
          policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
          quantity: '2000',
        },
        {
          assetName: 'adosia',
          policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
          quantity: '7999999300',
        },
      ],
      value: '489127674',
    },
  ],
  totalOutput: '491127674',
  withdrawals: [],
};

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
  .add('Transaction Info (Multi assets Details)', () => (
    <TransactionInfo
      highlightAddress={currentAddress}
      title="Transaction"
      showDetails
      {...transactionMA}
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
  .add('UnmoderatedDataConsented', () => (
    <UnmoderatedDataConsented type="transaction" />
  ));
