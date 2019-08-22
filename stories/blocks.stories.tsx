import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import React from 'react';
import BlocksSearchForm from '../source/features/blocks/components/BlocksSearchForm';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('Blocks', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('Blocks Search', () => (
    <BlocksSearchForm
      searchResult={null}
      triggerBlockSearch={action('triggerBlockSearch')}
    />
  ));
