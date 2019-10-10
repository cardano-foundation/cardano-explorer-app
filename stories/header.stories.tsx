import { storiesOf } from '@storybook/react';
import React from 'react';
import Header, {
  BrandType,
} from '../source/features/widgets/header/components/Header';

storiesOf('Header', module).add('Header', () => (
  <Header withSearch brandType={BrandType.ENLARGED} />
));
