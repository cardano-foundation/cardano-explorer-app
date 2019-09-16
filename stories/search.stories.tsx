import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import Search from '../source/features/shared/search/components/Search';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Search Form', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Search', () => (
    <Search triggerBlockSearch={action('triggerBlockSearch')} />
  ));
