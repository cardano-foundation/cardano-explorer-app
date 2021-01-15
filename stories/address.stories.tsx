import { storiesOf } from '@storybook/react';
import React from 'react';
import AddressSummary from '../source/features/address/ui/AddressSummary';

const addressSummary = {
  address:
    'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
  finalBalance: '89727',
  title: 'Address',
  transactionsCount: '2',
  tokensBalance: [
    {
      assetName: 'PEACEtoken',
      quantity: '1',
      policyId: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
    },
    {
      assetName: 'LINK',
      quantity: '1160',
      policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
    },
    {
      assetName: 'machtl2coin',
      quantity: '10',
      policyId: 'ecd07b4ef62f37a68d145de8efd60c53d288dd5ffc641215120cc3db',
    },
    {
      assetName: 'nutcoin',
      quantity: '1',
      policyId: '34250edd1e9836f5378702fbf9416b709bc140e04f668cc355208518',
    },
  ],
};

storiesOf('Address Summary', module).add('Address Summary', () => (
  <AddressSummary {...addressSummary} />
));
