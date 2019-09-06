import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import SearchForm from '../source/features/shared/search/components/SearchForm';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Blocks', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Blocks Search', () => (
    <SearchForm
      searchResult={null}
      triggerBlockSearch={action('triggerBlockSearch')}
    />
  ));
