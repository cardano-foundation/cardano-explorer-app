import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandType } from '../source/constants';
import { Header } from '../source/widgets/layout';

storiesOf('Header', module).add('Header', () => (
  <Header brandType={BrandType.ENLARGED} />
));
