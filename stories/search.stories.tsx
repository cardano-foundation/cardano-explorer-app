import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Search from '../source/features/shared/search/components/Search';

storiesOf('Search', module).add('Search', () => (
  <div style={{ backgroundColor: '#1c1f30' }}>
    <Search triggerBlockSearch={action('triggerBlockSearch')} />
  </div>
));
