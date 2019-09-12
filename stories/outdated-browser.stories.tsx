import { storiesOf } from '@storybook/react';
import React from 'react';
import OutdatedBrowser from '../source/features/outdated-browser/components/OutdatedBrowser';
import { ThemeDecorator } from './support/ThemeDecorator';

storiesOf('OutdatedBrowser', module)
  .addDecorator(story => <ThemeDecorator>{story()}</ThemeDecorator>)
  .add('OutdatedBrowser', () => (
    <OutdatedBrowser propFirst={''} propSecond={''} />
  ));
