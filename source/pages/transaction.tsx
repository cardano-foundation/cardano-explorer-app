import debug from 'debug';
import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../common/constants';
import { environment } from '../environment';
import TransactionInfo from '../features/transactions/components/TransactionInfo';
import TransactionList from '../features/transactions/components/TransactionList';
import TransactionSummary from '../features/transactions/components/TransactionSummary';
import FooterContainer from '../features/widgets/footer/containers/FooterContainer';
import Header from '../features/widgets/header/components/Header';
import Layout from '../layout/Layout';
import styles from './transaction.scss';

if (environment.DEBUG) {
  debug.enable(environment.DEBUG);
}

const transactionSummary = {
  address:
    'DdzFFzCqrhshP3eXMp6T6yBAurVd1cJsD8WHg7BbBwNy3AVN2k5jqDPENM9U4zHX5mqdZWxbELWtQnc8dzsM9f8k1dEiuMW9aDU1AGes',
  block: 11044,
  epoch: 48,
  fee: 0.171246,
  receivedTime: 1470006392000,
  slot: 11044,
  totalOutput: 224909.277897,
};

const transactionList = [
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

let TransactionPage = () => <NoSSR />;

if (environment.IS_CLIENT) {
  TransactionPage = () => (
    <NoSSR>
      <Layout>
        <div className={styles.transactionLayout}>
          <Header withSearch brandType={BrandType.SHRINKED} />
          <div className={styles.container}>
            <div className={styles.transactionSummary}>
              <TransactionSummary
                title="Transaction Summary"
                {...transactionSummary}
              />
            </div>
            <div className={styles.transactionInfo}>
              <TransactionInfo title="Transaction" {...transactionList[0]} />
            </div>
            <div className={styles.transactionList}>
              <TransactionList title="Transactions" items={transactionList} />
            </div>
          </div>
          <FooterContainer />
        </div>
      </Layout>
    </NoSSR>
  );
}

export default TransactionPage;
