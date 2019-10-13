import { storiesOf } from '@storybook/react';
import React from 'react';
import OutdatedBrowser from '../source/features/widgets/outdated-browser/components/OutdatedBrowser';

storiesOf('Outdated Browser', module).add('Outdated Browser', () => (
  <OutdatedBrowser
    text="Your web browser is out of date"
    updateBrowserUrl="http://browser-update.org/update.html?force_outdated=true"
  />
));
