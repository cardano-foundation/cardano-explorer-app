import classnames from 'classnames';
import React, { Component } from 'react';
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

interface IState {
  isDropdownVisible: boolean;
}
const initialState = {
  isDropdownVisible: false,
};

export default class LanguageSwitcher extends Component<
  ILanguageSwitcherParams,
  IState
> {
  public state = {
    ...initialState,
  };

  public onLanguageClick = () => {
    // @todo
    this.setState({ isDropdownVisible: !this.state.isDropdownVisible });
  };

  public render() {
    const { currentLanguage, languageOptions } = this.props;
    const { isDropdownVisible } = this.state;

    return (
      <div
        className={styles.languageSwitcherContainer}
        onClick={() => this.onLanguageClick()}
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
            {languageOptions.map(lang => (
              <li
                key={lang.code}
                onClick={() => {
                  this.props.onLanguageSwitch?.(lang.code);
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
  }
}
