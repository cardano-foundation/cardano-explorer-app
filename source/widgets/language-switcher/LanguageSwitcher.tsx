import classnames from 'classnames';
import React, { useState } from 'react';
import { SupportedLocale } from '../../features/i18n/types';
import styles from './LanguageSwitcher.module.scss';

export interface ILocaleProps {
  code: SupportedLocale;
  title: string;
}

export interface ILanguageSwitcherParams {
  currentLanguage: ILocaleProps;
  languageOptions: Array<ILocaleProps>;
  onLanguageSwitch?: (locale: SupportedLocale) => void;
}

const LanguageSwitcher = (props: ILanguageSwitcherParams) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { currentLanguage, languageOptions } = props;

  return (
    <div
      className={styles.languageSwitcherContainer}
      onClick={() => setIsDropdownVisible(!isDropdownVisible)}
    >
      <div className={styles.currentLanguage}>
        <span className={styles.isMobileOnly}>{currentLanguage.code}</span>
        <span className={styles.isDektopOnly}>{currentLanguage.title}</span>
      </div>
      <div className={styles.languageSelector}>
        <span
          className={classnames([
            styles.arrow,
            isDropdownVisible ? styles.isDropdownVisible : null,
          ])}
        />
      </div>
      {languageOptions.length > 0 && (
        <ul
          className={classnames([
            styles.languagesMenu,
            isDropdownVisible ? styles.isDropdownVisible : null,
          ])}
        >
          {languageOptions.map((lang) => (
            <li
              key={lang.code}
              onClick={() => {
                props.onLanguageSwitch?.(lang.code);
              }}
            >
              <span className={styles.isMobileOnly}>{lang.code}</span>
              <span className={styles.isDektopOnly}>{lang.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;
