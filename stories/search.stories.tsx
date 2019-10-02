import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Search from '../source/features/widgets/search/components/Search';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Search', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Search', () => (
    <div style={{ backgroundColor: '#1c1f30' }}>
      <Search triggerBlockSearch={action('triggerBlockSearch')} />
    </div>
  ));
