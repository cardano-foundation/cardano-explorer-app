import { storiesOf } from '@storybook/react';
import React from 'react';
import { SupportedLocale } from '../source/features/i18n/types';
import LanguageSwitcher from '../source/widgets/language-switcher/LanguageSwitcher';

const currentLanguage = {
  code: SupportedLocale.EN,
  title: 'English',
};

const languages = [
  { code: SupportedLocale.EN, title: 'English' },
  { code: SupportedLocale.JA, title: 'Japanese' },
];

storiesOf('Language Switcher Component', module).add(
  'Language Switcher',
  () => (
    <LanguageSwitcher
      currentLanguage={currentLanguage}
      languageOptions={languages}
    />
  )
);
