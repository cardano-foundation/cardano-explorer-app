import React, { Component } from 'react';
import { SCREEN_BREAKPOINTS } from '../../constants';
import styles from './LanguageSwitcher.module.scss';

export interface ILanguageSwitcherParams {
  currentLanguage: any;
  languages: Array<any>;
}

export default class LanguageSwitcher extends Component<
  ILanguageSwitcherParams
> {
  public onLanguageClick = () => {
    // @todo
  };

  public onLanguageSwitch = (language: any) => {
    // @todo
  };

  public render() {
    const { currentLanguage, languages } = this.props;

    // const isMobileScreen = window.innerWidth < SCREEN_BREAKPOINTS.MD;
    const isMobileScreen = false;

    return (
      <div
        className={styles.languageSwitcherContainer}
        onClick={this.onLanguageClick}
      >
        <div className={styles.currentLanguage}>
          {isMobileScreen ? currentLanguage.code : currentLanguage.title}
        </div>
        <div className={styles.languageSelector}>
          <span className={styles.languageDropdown} />
        </div>
        {languages.length > 0 && (
          <ul className={styles.languagesDropdown}>
            {languages.map(lang => (
              <li
                key={lang.code}
                onClick={() => {
                  this.onLanguageSwitch(lang);
                }}
              >
                {lang.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
