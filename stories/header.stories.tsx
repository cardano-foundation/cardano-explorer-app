import { storiesOf } from '@storybook/react';
import React from 'react';
import Header, {
  BrandType,
} from '../source/features/widgets/header/components/Header';

storiesOf('Header', module).add('Header', () => (
  <div style={{ backgroundColor: '#121326', height: '600px' }}>
    <Header withBackground withSearch brandType={BrandType.ENLARGED} />
  </div>
));
