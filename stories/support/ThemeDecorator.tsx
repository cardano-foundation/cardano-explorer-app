import React from 'react';
import PolymorphThemeProvider from '../../source/styles/theme/PolymorphThemeProvider';
import './ThemeDecorator.scss';

import '../../source/styles/global/_fonts.scss';
import '../../source/styles/global/_reset.scss';

interface IProps {
  children: React.ReactNode;
}

export const ThemeDecorator = ({ children }: IProps) => {
  return <PolymorphThemeProvider>{children}</PolymorphThemeProvider>;
};
