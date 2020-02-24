import { storiesOf } from '@storybook/react';
import React from 'react';
import { BrandType } from '../source/constants';
import LanguageSwitcher from '../source/widgets/language-switcher/LanguageSwitcher';
import { Header, Layout } from '../source/widgets/layout';
import { PaddingDecorator } from './support/PaddingDecorator';

const currentLanguage = {
  code: 'EN',
  title: 'English',
};

const languages = [
  { code: 'EN', title: 'English' },
  { code: 'JP', title: 'Japanese' },
];

storiesOf('Language Switcher Component', module)
  .addDecorator(story => <PaddingDecorator>{story()}</PaddingDecorator>)
  .add('Language Switcher', () => (
      <Layout>
        <div>
          <LanguageSwitcher
            currentLanguage={currentLanguage}
            languages={languages}
          />
          <Header brandType={BrandType.ENLARGED} />
        </div>
      </Layout>
  ));
