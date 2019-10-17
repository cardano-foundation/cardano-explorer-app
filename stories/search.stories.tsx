import { storiesOf } from '@storybook/react';
import { noop } from 'lodash';
import React from 'react';
import NoSearchResult from '../source/features/widgets/search/components/NoSearchResult';
import Search from '../source/features/widgets/search/components/Search';
import { PaddingDecorator } from './support/PaddingDecorator';

storiesOf('Search', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Search', () => <Search onSearch={noop} />)
  .add('No Search Result', () => <NoSearchResult />);
