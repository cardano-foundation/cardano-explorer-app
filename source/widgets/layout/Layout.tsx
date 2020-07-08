import { without } from 'lodash';
import React from 'react';
import { SUPPORTED_LOCALES } from '../../features/i18n';
import { useI18nFeature } from '../../features/i18n/context';
import Container from '../container/Container';
import LanguageSwitcher from '../language-switcher/LanguageSwitcher';
import styles from './Layout.module.scss';

interface IProps {
  children: React.ReactNode;
  header?: React.ReactNode;
}

export const Layout = ({ children, header }: IProps) => {
  const i18n = useI18nFeature();
  const { locale, translate } = i18n.store;
  return (
    <>
      <LanguageSwitcher
        currentLanguage={{
          code: locale,
          title: translate(`locales.${locale}`),
        }}
        languageOptions={without(SUPPORTED_LOCALES, locale).map((l) => ({
          code: l,
          title: translate(`locales.${l}`),
        }))}
        onLanguageSwitch={(l) =>
          i18n.actions.switchLocale.trigger({ locale: l })
        }
      />
      <div className={styles.content}>
        {header}
        <Container>{children}</Container>
      </div>
    </>
  );
};
