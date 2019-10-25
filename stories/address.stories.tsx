import { storiesOf } from '@storybook/react';
import React from 'react';
import AddressSummary from '../source/features/address/components/AddressSummary';
import { PaddingDecorator } from './support/PaddingDecorator';

const addressSummary = {
  address:
    'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
  finalBalance: 0.897277,
  title: 'Address',
  transactions: 2,
};

storiesOf('Address Summary', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Address Summary', () => <AddressSummary {...addressSummary} />);
