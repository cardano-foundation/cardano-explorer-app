import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandType } from '../source/common/constants';
import Header from '../source/features/widgets/header/components/Header';

storiesOf('Header', module).add('Header', () => (
  <Header withSearch brandType={BrandType.ENLARGED} />
));
