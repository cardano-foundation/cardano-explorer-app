import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import NoSearchResult from '../source/features/widgets/search/components/NoSearchResult';
import Search from '../source/features/widgets/search/components/Search';

storiesOf('Search', module)
  .add('Search', () => (
    <div style={{ backgroundColor: '#1c1f30' }}>
      <Search triggerBlockSearch={action('triggerBlockSearch')} />
    </div>
  ))
  .add('No Search Results', () => <NoSearchResult />);
