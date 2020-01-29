import React from 'react';
import PolymorphThemeProvider from '../../source/styles/theme/PolymorphThemeProvider';

import '../../source/styles/global/fonts.scss';
import '../../source/styles/global/reset.scss';
import { cardanoExplorerTheme } from '../../source/styles/theme/theme';

import styles from './ThemeDecorator.scss';

interface IProps {
  children: React.ReactNode;
}

export const ThemeDecorator = ({ children }: IProps) => (
  <PolymorphThemeProvider>
    <div style={cardanoExplorerTheme}>
      <div className={styles.storyContainer}>{children}</div>
    </div>
  </PolymorphThemeProvider>
);
