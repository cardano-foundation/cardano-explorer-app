import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandType } from '../source/constants';
import { Footer, Header } from '../source/widgets/layout';
import { PaddingDecorator } from './support/PaddingDecorator';

storiesOf('Layout|Header', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Header', () => <Header brandType={BrandType.ENLARGED} />);

storiesOf('Layout|Footer', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Footer', () => <Footer />);
