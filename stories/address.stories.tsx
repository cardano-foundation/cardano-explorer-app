import { storiesOf } from '@storybook/react';
import React from 'react';
import AddressSummary from '../source/features/address/ui/AddressSummary';

const addressSummary = {
  address:
    'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
  finalBalance: '89727',
  title: 'Address',
  transactionsCount: '2',
};

storiesOf('Address Summary', module).add('Address Summary', () => (
  <AddressSummary {...addressSummary} />
));
