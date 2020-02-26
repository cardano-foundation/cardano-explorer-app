import React, { Component } from 'react';
import { SCREEN_BREAKPOINTS } from '../../constants';
import styles from './LanguageSwitcher.module.scss';

export interface ILanguageSwitcherParams {
  currentLanguage: any;
  languages: Array<any>;
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

  public onLanguageSwitch = (language: any) => {
    // @todo
  };

  public render() {
    const { currentLanguage, languages } = this.props;
    const { isDropdownVisible } = this.state;

    const isMobileScreen = window.innerWidth < SCREEN_BREAKPOINTS.MD;

    return (
      <div
        className={styles.languageSwitcherContainer}
        onClick={() => this.onLanguageClick()}
      >
        <div className={styles.currentLanguage}>
          {isMobileScreen ? currentLanguage.code : currentLanguage.title}
        </div>
        <div className={styles.languageSelector}>
          <span
            className={
              isDropdownVisible
                ? styles.showLanguageDropdown
                : styles.languageDropdown
            }
          />
        </div>
        {languages.length > 0 && (
          <ul
            className={
              isDropdownVisible
                ? styles.showLanguagesDropdown
                : styles.languagesDropdown
            }
          >
            {languages.map(lang => (
              <li
                key={lang.code}
                onClick={() => {
                  this.onLanguageSwitch(lang);
                }}
              >
                {isMobileScreen ? lang.code : lang.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
