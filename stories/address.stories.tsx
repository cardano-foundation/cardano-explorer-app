import { storiesOf } from '@storybook/react';
import React from 'react';
import AddressSummary from '../source/features/address/ui/AddressSummary';

const addressSummary = {
  address:
    'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
  finalBalance: '89727',
  title: 'Address',
  tokensBalance: [
    {
      assetName: 'PEACEtoken',
      policyId: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
      quantity: '1',
    },
    {
      assetName: 'LINK',
      policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
      quantity: '1160',
    },
    {
      assetName: 'machtl2coin',
      policyId: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
      quantity: '10',
    },
    {
      assetName: 'nutcoin',
      policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
      quantity: '1',
    },
  ],
  transactionsCount: '2',
};

storiesOf('Address Summary', module).add('Address Summary', () => (
  <AddressSummary {...addressSummary} />
));
