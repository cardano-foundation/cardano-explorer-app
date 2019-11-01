import React from 'react';
import NoSSR from 'react-no-ssr';
import { BrandType } from '../constants';
import { environment } from '../environment';
import AddressSummary from '../features/address/components/AddressSummary';
import { SearchFeatureProvider } from '../features/search/components/SearchFeatureProvider';
import { SearchBar } from '../features/search/containers/SearchBar';
import TransactionList from '../features/transactions/components/TransactionList';
import Container from '../widgets/container/Container';
import { Footer, Header, Layout } from '../widgets/layout';
import styles from './address.scss';

const addressSummary = {
  address:
    'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
  finalBalance: 0.897277,
  title: 'Address',
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

let AddressPage = () => <NoSSR />;
if (environment.IS_CLIENT) {
  AddressPage = () => (
    <NoSSR>
      <Layout>
        <Header brandType={BrandType.SHRINKED} />
        <div className={styles.searchContainer}>
          <SearchFeatureProvider>
            <SearchBar brandType={BrandType.SHRINKED} />
          </SearchFeatureProvider>
        </div>
        <Container>
          <div className={styles.addressSummary}>
            <AddressSummary {...addressSummary} />
          </div>
          <div className={styles.transactionList}>
            <TransactionList title="Transactions" items={transactions} />
          </div>
        </Container>
        <Footer />
      </Layout>
    </NoSSR>
  );
}

export default AddressPage;
