import { storiesOf } from '@storybook/react';
import React from 'react';
import AddressSummary from '../source/features/address/components/AddressSummary';
import { ThemeDecorator } from './support/ThemeDecorator';

const addressSummary = {
  address:
    'DdzFFzCqrht7PVrPU8FAnks5Ys6BxLxKjy7sFdNnkDFLoMaK8FoEiun6eMBowpnkS8h69w3VxTrJ6pTiwYSgF1mC22ifAqQhAPY4ty4j',
  finalBalance: 0.897277,
  title: 'Address',
  transactions: 2,
};

storiesOf('Address', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Address Summary', () => (
    <div
      style={{
        backgroundColor: '#121326',
        paddingBottom: 10,
        paddingLeft: 247,
        paddingRight: 247,
        paddingTop: 10,
      }}
    >
      <AddressSummary {...addressSummary} />
    </div>
  ));
