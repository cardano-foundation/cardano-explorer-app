import React from 'react';
import { CssVariablesProvider } from '../../source/styles/theme/CssVariablesProvider';
import PolymorphThemeProvider from '../../source/styles/theme/PolymorphThemeProvider';

import '../../source/styles/global/_fonts.scss';
import '../../source/styles/global/_reset.scss';
import './global.scss';
import { cardanoExplorerTheme } from '../../source/styles/theme/theme';

import styles from './ThemeDecorator.scss';

interface IProps {
  children: React.ReactNode;
}

export const ThemeDecorator = ({ children }: IProps) => (
  <PolymorphThemeProvider>
    <CssVariablesProvider variables={cardanoExplorerTheme}>
      <div className={styles.storyContainer}>{children}</div>
    </CssVariablesProvider>
  </PolymorphThemeProvider>
);
