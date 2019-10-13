import { storiesOf } from '@storybook/react';
import React from 'react';
import OutdatedBrowser from '../source/features/widgets/outdated-browser/components/OutdatedBrowser';

storiesOf('Outdated Browser', module).add('Outdated Browser', () => (
  <OutdatedBrowser />
));
